
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Excel Export
export const exportToExcel = (data: any[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `${fileName}.xlsx`);
};

// PDF Document Template
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10
    },
    text: {
        fontSize: 12,
        marginBottom: 5
    }
});

interface PDFReportProps {
    title: string;
    widgets: any[];
}

const PDFReport = ({ title, widgets }: PDFReportProps) => (
    <Document>
    <Page size= "A4" style = { styles.page } >
        <View style={ styles.section }>
            <Text style={ styles.title }> { title } </Text>
                < Text style = { styles.text } > Generated on { new Date().toLocaleDateString() } </Text>

{
    widgets.map((widget, index) => (
        <View key= { index } style = {{ marginBottom: 20 }}>
            <Text style={ styles.subtitle }> { widget.title } </Text>
                < Text style = { styles.text } > Type: { widget.type } </Text>
                    < Text style = { styles.text } >
                    {
                        widget.type === 'chart' ? '[Chart Visualization Placeholder]' :
                            widget.type === 'table' ? '[Table Data Placeholder]' :
                                '[Content Placeholder]'
                    }
                        </Text>
                        </View>
                ))}
</View>
    </Page>
    </Document>
);

// PDF Export
export const exportToPDF = async (title: string, widgets: any[]) => {
    const blob = await pdf(<PDFReport title={ title } widgets = { widgets } />).toBlob();
    saveAs(blob, `${title.replace(/\s+/g, '_')}.pdf`);
};
