
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Save, Download, Layout, Trash2, GripVertical } from "lucide-react";

interface ReportCanvasProps {
    reportTitle: string;
    setReportTitle: (title: string) => void;
    selectedWidgets: any[];
    onDragEnd: (result: DropResult) => void;
    onRemoveWidget: (index: number) => void;
    onExportPDF: () => void;
}

export const ReportCanvas = ({
    reportTitle,
    setReportTitle,
    selectedWidgets,
    onDragEnd,
    onRemoveWidget,
    onExportPDF
}: ReportCanvasProps) => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            <Card className="h-full flex flex-col bg-slate-50/50 dark:bg-slate-900/10 border-dashed">
                <div className="p-4 border-b bg-card flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <Label htmlFor="title" className="sr-only">Report Title</Label>
                        <Input
                            id="title"
                            value={reportTitle}
                            onChange={(e) => setReportTitle(e.target.value)}
                            className="font-bold text-lg border-transparent hover:border-input focus:border-input bg-transparent w-full max-w-md"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2"><Save className="w-4 h-4" /> Save Template</Button>
                        <Button size="sm" className="gap-2" onClick={onExportPDF}><Download className="w-4 h-4" /> Export PDF</Button>
                        <Button variant="outline" size="sm" className="gap-2 onClick={() => alert('Excel export coming soon')}"><FileText className="w-4 h-4" /> Export Excel</Button>
                    </div>
                </div>

                <ScrollArea className="flex-1 p-8">
                    <div className="w-[210mm] min-h-[297mm] mx-auto bg-card shadow-sm border rounded-sm p-[10mm]">
                        {/* Report Header */}
                        <div className="mb-8 border-b pb-4">
                            <h1 className="text-3xl font-bold text-primary">{reportTitle}</h1>
                            <p className="text-muted-foreground mt-2">Generated on {new Date().toLocaleDateString()}</p>
                        </div>

                        {/* Drag Drop Area */}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="report-canvas">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="space-y-4 min-h-[200px]"
                                    >
                                        {selectedWidgets.length === 0 && (
                                            <div className="h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground opacity-50">
                                                <Layout className="w-12 h-12 mb-2" />
                                                <p>Drag widgets here or click + to add</p>
                                            </div>
                                        )}

                                        {selectedWidgets.map((widget: any, index: number) => (
                                            <Draggable key={widget.uniqueId} draggableId={widget.uniqueId} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className="p-4 bg-background border rounded-lg shadow-sm group relative hover:ring-2 ring-primary/20 transition-all"
                                                    >
                                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => onRemoveWidget(index)}>
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                            <div {...provided.dragHandleProps} className="cursor-grab">
                                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                                    <GripVertical className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <h3 className="font-semibold mb-2">{widget.title}</h3>
                                                        <div className="h-32 bg-muted/20 rounded flex items-center justify-center text-xs text-muted-foreground">
                                                            {widget.type === 'chart' ? 'Chart Placeholder' : widget.type === 'table' ? 'Table Placeholder' : 'Content Placeholder'}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
};
