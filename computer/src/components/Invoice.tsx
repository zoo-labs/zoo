import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font,
  Image,
  pdf
} from '@react-pdf/renderer';
import type { InvoiceData } from '../lib/invoices';
import { formatCurrency, formatDate } from '../lib/invoices';

// Register fonts (optional - for better typography)
// Font.register({
//   family: 'Inter',
//   src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
// });

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #FF6B35',
    paddingBottom: 20
  },
  logo: {
    width: 150,
    marginBottom: 10
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5
  },
  companyInfo: {
    fontSize: 10,
    color: '#666666',
    lineHeight: 1.4
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 5
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  column: {
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '45%'
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 3,
    lineHeight: 1.4
  },
  table: {
    marginTop: 20,
    marginBottom: 20
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderBottom: '1 solid #E0E0E0',
    fontWeight: 'bold'
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: '1 solid #F0F0F0'
  },
  tableCol: {
    fontSize: 10,
    color: '#333333'
  },
  tableColHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
    textTransform: 'uppercase'
  },
  col1: { width: '45%' },
  col2: { width: '15%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '20%', textAlign: 'right' },
  totals: {
    marginTop: 20,
    marginLeft: 'auto',
    width: '300px'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  totalLabel: {
    fontSize: 11,
    color: '#666666'
  },
  totalValue: {
    fontSize: 11,
    color: '#333333',
    fontWeight: 'normal'
  },
  grandTotal: {
    borderTop: '2 solid #FF6B35',
    marginTop: 10,
    paddingTop: 10
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35'
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35'
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 30,
    borderTop: '1 solid #E0E0E0'
  },
  footerText: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.5,
    marginBottom: 5
  },
  statusBadge: {
    padding: '4 8',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 5
  },
  statusPaid: {
    backgroundColor: '#10B981'
  },
  statusOpen: {
    backgroundColor: '#F59E0B'
  },
  statusDraft: {
    backgroundColor: '#6B7280'
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  notes: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 5
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5
  },
  notesText: {
    fontSize: 10,
    color: '#666666',
    lineHeight: 1.5
  }
});

// Invoice PDF Document Component
export const InvoiceDocument: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.companyName}>HANZO COMPUTER</Text>
            <Text style={styles.companyInfo}>{invoice.company.address}</Text>
            <Text style={styles.companyInfo}>
              {invoice.company.city}, {invoice.company.state} {invoice.company.zip}
            </Text>
            <Text style={styles.companyInfo}>{invoice.company.country}</Text>
            <Text style={styles.companyInfo}>Email: {invoice.company.email}</Text>
            <Text style={styles.companyInfo}>Phone: {invoice.company.phone}</Text>
            <Text style={styles.companyInfo}>Web: {invoice.company.website}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
            <Text style={styles.invoiceNumber}>Date: {formatDate(invoice.invoiceDate)}</Text>
            {invoice.dueDate && (
              <Text style={styles.invoiceNumber}>Due: {formatDate(invoice.dueDate)}</Text>
            )}
            <View style={[
              styles.statusBadge,
              invoice.status === 'paid' ? styles.statusPaid :
              invoice.status === 'open' ? styles.statusOpen :
              styles.statusDraft
            ]}>
              <Text style={styles.statusText}>{invoice.status}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Billing Information */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.text}>{invoice.customer.name}</Text>
          {invoice.customer.company && (
            <Text style={styles.text}>{invoice.customer.company}</Text>
          )}
          {invoice.customer.address && (
            <Text style={styles.text}>{invoice.customer.address}</Text>
          )}
          {invoice.customer.city && (
            <Text style={styles.text}>
              {invoice.customer.city}, {invoice.customer.state} {invoice.customer.zip}
            </Text>
          )}
          {invoice.customer.country && (
            <Text style={styles.text}>{invoice.customer.country}</Text>
          )}
          <Text style={styles.text}>{invoice.customer.email}</Text>
          {invoice.customer.phone && (
            <Text style={styles.text}>{invoice.customer.phone}</Text>
          )}
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          {invoice.paymentMethod && (
            <Text style={styles.text}>Method: {invoice.paymentMethod}</Text>
          )}
          {invoice.paymentTerms && (
            <Text style={styles.text}>Terms: {invoice.paymentTerms}</Text>
          )}
          {invoice.paidAt && (
            <Text style={styles.text}>Paid: {formatDate(invoice.paidAt)}</Text>
          )}
        </View>
      </View>

      {/* Line Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableColHeader, styles.col1]}>Description</Text>
          <Text style={[styles.tableColHeader, styles.col2]}>Quantity</Text>
          <Text style={[styles.tableColHeader, styles.col3]}>Unit Price</Text>
          <Text style={[styles.tableColHeader, styles.col4]}>Total</Text>
        </View>
        {invoice.lineItems.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.col1}>
              <Text style={styles.tableCol}>{item.description}</Text>
              {item.gpuType && (
                <Text style={{ ...styles.tableCol, fontSize: 9, color: '#666666' }}>
                  GPU: {item.gpuType}
                </Text>
              )}
              {item.duration && (
                <Text style={{ ...styles.tableCol, fontSize: 9, color: '#666666' }}>
                  Duration: {item.duration}
                </Text>
              )}
            </View>
            <Text style={[styles.tableCol, styles.col2]}>{item.quantity}</Text>
            <Text style={[styles.tableCol, styles.col3]}>
              {formatCurrency(item.unitPrice)}
            </Text>
            <Text style={[styles.tableCol, styles.col4]}>
              {formatCurrency(item.total)}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax ({(invoice.taxRate * 100).toFixed(2)}%)</Text>
          <Text style={styles.totalValue}>{formatCurrency(invoice.tax)}</Text>
        </View>
        <View style={[styles.totalRow, styles.grandTotal]}>
          <Text style={styles.grandTotalLabel}>Total</Text>
          <Text style={styles.grandTotalValue}>{formatCurrency(invoice.total)}</Text>
        </View>
        {invoice.amountPaid > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Amount Paid</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.amountPaid)}</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text style={styles.grandTotalLabel}>Amount Due</Text>
          <Text style={styles.grandTotalValue}>{formatCurrency(invoice.amountDue)}</Text>
        </View>
      </View>

      {/* Notes */}
      {invoice.notes && (
        <View style={styles.notes}>
          <Text style={styles.notesTitle}>Notes</Text>
          <Text style={styles.notesText}>{invoice.notes}</Text>
        </View>
      )}

      {/* Footer / Terms & Conditions */}
      <View style={styles.footer}>
        {invoice.termsAndConditions && (
          <>
            <Text style={styles.notesTitle}>Terms & Conditions</Text>
            <Text style={styles.footerText}>{invoice.termsAndConditions}</Text>
          </>
        )}
        <Text style={{ ...styles.footerText, marginTop: 10, textAlign: 'center' }}>
          Thank you for your business!
        </Text>
      </View>
    </Page>
  </Document>
);

// Invoice Component with Preview and Download
interface InvoiceProps {
  invoice: InvoiceData;
  showPreview?: boolean;
  onDownload?: () => void;
}

export const Invoice: React.FC<InvoiceProps> = ({
  invoice,
  showPreview = false,
  onDownload
}) => {
  const fileName = `${invoice.invoiceNumber}.pdf`;

  // Generate PDF blob
  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = <InvoiceDocument invoice={invoice} />;
    const blob = await pdf(doc).toBlob();
    return blob;
  };

  return (
    <div className="invoice-container">
      {showPreview ? (
        <PDFViewer width="100%" height="600px" className="rounded-lg shadow-lg">
          <InvoiceDocument invoice={invoice} />
        </PDFViewer>
      ) : (
        <div className="flex gap-4">
          <PDFDownloadLink
            document={<InvoiceDocument invoice={invoice} />}
            fileName={fileName}
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={onDownload}
          >
            {({ loading }) =>
              loading ? 'Generating PDF...' : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Download Invoice
                </>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

// Export function to generate PDF blob programmatically
export const generateInvoicePDF = async (invoice: InvoiceData): Promise<Blob> => {
  const doc = <InvoiceDocument invoice={invoice} />;
  const blob = await pdf(doc).toBlob();
  return blob;
};

export default Invoice;