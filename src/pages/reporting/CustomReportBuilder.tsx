
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2, Layout, Save, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ReportCanvas } from "@/components/reporting/ReportCanvas";

// Mock widgets
const AVAILABLE_WIDGETS = [
    { id: 'w1', title: 'Compliance Score Chart', type: 'chart' },
    { id: 'w2', title: 'Risk Heatmap', type: 'chart' },
    { id: 'w3', title: 'Vulnerabilities List', type: 'table' },
    { id: 'w4', title: 'Executive Summary', type: 'text' },
    { id: 'w5', title: 'Control Status', type: 'metric' },
    { id: 'w6', title: 'Incident Trend', type: 'chart' },
];

const CustomReportBuilder = () => {
    const [reportTitle, setReportTitle] = useState("New Custom Report");
    const [selectedWidgets, setSelectedWidgets] = useState([]);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        // Logic to reorder widgets
        const items = Array.from(selectedWidgets);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedWidgets(items);
    };

    const addWidget = (widget: any) => {
        setSelectedWidgets([...selectedWidgets, { ...widget, uniqueId: Math.random().toString(36).substr(2, 9) }]);
    };

    const removeWidget = (index: number) => {
        const newWidgets = [...selectedWidgets];
        newWidgets.splice(index, 1);
        setSelectedWidgets(newWidgets);
    };

    const handleExportPDF = () => {
        console.log("Exporting PDF...");
    };

    return (
        <div className="flex h-[calc(100vh-100px)] gap-4">
            {/* Sidebar - Widget Selection */}
            <div className="w-80 flex flex-col gap-4">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Builder Tools</CardTitle>
                        <CardDescription>Drag widgets to the canvas</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        <Tabs defaultValue="charts" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="charts" className="flex-1">Charts</TabsTrigger>
                                <TabsTrigger value="data" className="flex-1">Data</TabsTrigger>
                                <TabsTrigger value="text" className="flex-1">Text</TabsTrigger>
                            </TabsList>
                            <TabsContent value="charts" className="space-y-2 mt-4">
                                {AVAILABLE_WIDGETS.filter(w => w.type === 'chart').map(widget => (
                                    <div key={widget.id} className="p-3 border rounded-md cursor-pointer hover:bg-muted flex items-center justify-between group" onClick={() => addWidget(widget)}>
                                        <span className="text-sm font-medium">{widget.title}</span>
                                        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="data" className="space-y-2 mt-4">
                                {AVAILABLE_WIDGETS.filter(w => w.type === 'table' || w.type === 'metric').map(widget => (
                                    <div key={widget.id} className="p-3 border rounded-md cursor-pointer hover:bg-muted flex items-center justify-between group" onClick={() => addWidget(widget)}>
                                        <span className="text-sm font-medium">{widget.title}</span>
                                        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="text" className="space-y-2 mt-4">
                                {AVAILABLE_WIDGETS.filter(w => w.type === 'text').map(widget => (
                                    <div key={widget.id} className="p-3 border rounded-md cursor-pointer hover:bg-muted flex items-center justify-between group" onClick={() => addWidget(widget)}>
                                        <span className="text-sm font-medium">{widget.title}</span>
                                        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <ReportCanvas
                reportTitle={reportTitle}
                setReportTitle={setReportTitle}
                selectedWidgets={selectedWidgets}
                onDragEnd={handleDragEnd}
                onRemoveWidget={removeWidget}
                onExportPDF={handleExportPDF}
            />
        </div>
    );
};

export default CustomReportBuilder;
