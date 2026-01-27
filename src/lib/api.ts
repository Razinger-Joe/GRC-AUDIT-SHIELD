"""
API client for frontend integration.
Centralizes all API calls with authentication and error handling.
"""
import axios, { AxiosInstance, AxiosError } from 'axios';

// Get API URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // If 401 and not already retrying, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/api/auth/refresh`, {
                        refresh_token: refreshToken,
                    });

                    const { access_token, refresh_token: newRefreshToken } = response.data;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, logout user
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// API methods
export const api = {
    // Authentication
    auth: {
        register: (data: { email: string; password: string; full_name: string }) =>
            apiClient.post('/api/auth/register', data),

        login: (data: { email: string; password: string }) =>
            apiClient.post('/api/auth/login', data),

        getCurrentUser: () =>
            apiClient.get('/api/auth/me'),
    },

    // Compliance
    compliance: {
        getFrameworks: (params?: { skip?: number; limit?: number }) =>
            apiClient.get('/api/compliance/frameworks', { params }),

        getFramework: (id: number) =>
            apiClient.get(`/api/compliance/frameworks/${id}`),

        createFramework: (data: any) =>
            apiClient.post('/api/compliance/frameworks', data),

        getAssessments: () =>
            apiClient.get('/api/compliance/assessments'),

        createAssessment: (data: any) =>
            apiClient.post('/api/compliance/assessments', data),

        updateAssessment: (id: number, data: any) =>
            apiClient.patch(`/api/compliance/assessments/${id}`, data),
    },

    // IT General Controls
    itgc: {
        getControls: (params?: { skip?: number; limit?: number }) =>
            apiClient.get('/api/itgc/controls', { params }),

        getControl: (id: number) =>
            apiClient.get(`/api/itgc/controls/${id}`),

        createControl: (data: any) =>
            apiClient.post('/api/itgc/controls', data),

        createTest: (data: any) =>
            apiClient.post('/api/itgc/tests', data),

        getControlTests: (controlId: number) =>
            apiClient.get(`/api/itgc/controls/${controlId}/tests`),
    },

    // Risk Assessment
    risk: {
        getRisks: (params?: { skip?: number; limit?: number }) =>
            apiClient.get('/api/risks/', { params }),

        getRisk: (id: number) =>
            apiClient.get(`/api/risks/${id}`),

        createRisk: (data: any) =>
            apiClient.post('/api/risks/', data),

        updateRisk: (id: number, data: any) =>
            apiClient.patch(`/api/risks/${id}`, data),

        createMitigation: (data: any) =>
            apiClient.post('/api/risks/mitigations', data),

        getRiskMitigations: (riskId: number) =>
            apiClient.get(`/api/risks/${riskId}/mitigations`),
    },

    // Vulnerabilities
    vulnerabilities: {
        getVulnerabilities: (params?: { skip?: number; limit?: number; status?: string }) =>
            apiClient.get('/api/vulnerabilities/', { params }),

        getVulnerability: (id: number) =>
            apiClient.get(`/api/vulnerabilities/${id}`),

        createVulnerability: (data: any) =>
            apiClient.post('/api/vulnerabilities/', data),

        updateVulnerability: (id: number, data: any) =>
            apiClient.patch(`/api/vulnerabilities/${id}`, data),

        createPatch: (data: any) =>
            apiClient.post('/api/vulnerabilities/patches', data),

        getVulnerabilityPatches: (vulnId: number) =>
            apiClient.get(`/api/vulnerabilities/${vulnId}/patches`),
    },

    // Evidence
    evidence: {
        upload: (formData: FormData) =>
            apiClient.post('/api/evidence/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }),

        list: (params?: { skip?: number; limit?: number; category?: string }) =>
            apiClient.get('/api/evidence/', { params }),

        delete: (id: number) =>
            apiClient.delete(`/api/evidence/${id}`),
    },

    // Audit Trail
    audit: {
        getLogs: (params?: {
            skip?: number;
            limit?: number;
            action?: string;
            entity_type?: string;
            user_id?: number;
            days?: number;
        }) =>
            apiClient.get('/api/audit/logs', { params }),

        getUserActivity: (userId: number, params?: { skip?: number; limit?: number }) =>
            apiClient.get(`/api/audit/user/${userId}/activity`, { params }),
    },

    // Health check
    health: () =>
        apiClient.get('/health'),
};

export default apiClient;
