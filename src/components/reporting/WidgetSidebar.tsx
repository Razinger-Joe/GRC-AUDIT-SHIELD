
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

// Mock widgets configuration
export const AVAILABLE_WIDGETS = [
    { id: 'w1', title: 'Compliance Score Chart', type: 'chart' },
    { id: 'w2', title: 'Risk Heatmap', type: 'chart' },
    { id: 'w3', title: 'Vulnerabilities List', type: 'table' },
    { id: 'w4', title: 'Executive Summary', type: 'text' },
    { id: 'w5', title: 'Control Status', type: 'metric' },
    { id: 'w6', title: 'Incident Trend', type: 'chart' },
];

interface WidgetSidebarProps {
    onAddWidget: (widget: any) => void;
}

export const WidgetSidebar = ({ onAddWidget }: WidgetSidebarProps) => {
    return (
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
                                <WidgetTuple key={widget.id} widget={widget} onAdd={() => onAddWidget(widget)} />
                            ))}
                        </TabsContent>

                        <TabsContent value="data" className="space-y-2 mt-4">
                            {AVAILABLE_WIDGETS.filter(w => w.type === 'table' || w.type === 'metric').map(widget => (
                                <WidgetTuple key={widget.id} widget={widget} onAdd={() => onAddWidget(widget)} />
                            ))}
                        </TabsContent>

                        <TabsContent value="text" className="space-y-2 mt-4">
                            {AVAILABLE_WIDGETS.filter(w => w.type === 'text').map(widget => (
                                <WidgetTuple key={widget.id} widget={widget} onAdd={() => onAddWidget(widget)} />
                            ))}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

const WidgetTuple = ({ widget, onAdd }: { widget: any, onAdd: () => void }) => (
    <div className="p-3 border rounded-md cursor-pointer hover:bg-muted flex items-center justify-between group" onClick={onAdd}>
        <span className="text-sm font-medium">{widget.title}</span>
        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);
