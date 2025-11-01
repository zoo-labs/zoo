import React, { useState } from 'react';
import { Invoice, generateInvoicePDF } from './Invoice';
import {
  createInvoiceFromOrder,
  uploadInvoicePDF,
  storeInvoice,
  getUserInvoices,
  formatCurrency,
  formatDate
} from '../lib/invoices';
import { supabase } from '../lib/supabase';
import type { Order, Subscription, User } from '../lib/supabase';
import type { InvoiceData } from '../lib/invoices';

interface DashboardInvoicesProps {
  orders: Order[];
  subscriptions: Subscription[];
  user: User;
}

export const DashboardInvoices: React.FC<DashboardInvoicesProps> = ({
  orders,
  subscriptions,
  user
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<InvoiceData | null>(null);

  // Load existing invoices on mount
  React.useEffect(() => {
    loadInvoices();
  }, [user.id]);

  const loadInvoices = async () => {
    try {
      const data = await getUserInvoices(user.id);
      setInvoices(data);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const handleGenerateInvoice = async (order: Order) => {
    setLoading(order.id);
    try {
      // Create invoice data from order
      const invoiceData = await createInvoiceFromOrder(order, user);

      // Generate PDF blob
      const pdfBlob = await generateInvoicePDF(invoiceData);

      // Upload to Supabase Storage
      const pdfUrl = await uploadInvoicePDF(pdfBlob, invoiceData.invoiceNumber);

      // Store invoice in database
      await storeInvoice(invoiceData, pdfUrl);

      // Download the PDF
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${invoiceData.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Reload invoices
      await loadInvoices();

      alert('Invoice generated successfully!');
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Failed to generate invoice. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleDownloadInvoice = async (invoice: any) => {
    setLoading(invoice.id);
    try {
      if (invoice.pdf_url) {
        // Download existing PDF
        const response = await fetch(invoice.pdf_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${invoice.invoice_number}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Generate new PDF if not exists
        const order = orders.find(o => o.id === invoice.order_id);
        if (order) {
          await handleGenerateInvoice(order);
        }
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handlePreviewInvoice = async (order: Order) => {
    try {
      const invoiceData = await createInvoiceFromOrder(order, user);
      setPreviewInvoice(invoiceData);
      setShowPreview(order.id);
    } catch (error) {
      console.error('Error generating preview:', error);
      alert('Failed to generate preview.');
    }
  };

  const getInvoiceForOrder = (orderId: string) => {
    return invoices.find(inv => inv.order_id === orderId);
  };

  const getOrderStatus = (status: string) => {
    const statusStyles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      provisioning: 'bg-purple-100 text-purple-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Orders & Invoices Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Orders & Invoices</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => {
                  const invoice = getInvoiceForOrder(order.id);
                  return (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="truncate">
                              {item.quantity}x {item.description || item.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatus(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice ? (
                          <span className="text-green-600">
                            #{invoice.invoice_number}
                          </span>
                        ) : (
                          <span className="text-gray-400">Not generated</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          {invoice ? (
                            <button
                              onClick={() => handleDownloadInvoice(invoice)}
                              disabled={loading === invoice.id}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                            >
                              {loading === invoice.id ? 'Loading...' : 'Download'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleGenerateInvoice(order)}
                              disabled={loading === order.id || order.status !== 'paid'}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                              {loading === order.id ? 'Generating...' : 'Generate Invoice'}
                            </button>
                          )}
                          <button
                            onClick={() => handlePreviewInvoice(order)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Preview
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice Preview Modal */}
      {showPreview && previewInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Invoice Preview - {previewInvoice.invoiceNumber}
                  </h3>
                  <button
                    onClick={() => {
                      setShowPreview(null);
                      setPreviewInvoice(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2">
                  <Invoice
                    invoice={previewInvoice}
                    showPreview={true}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Invoice
                  invoice={previewInvoice}
                  showPreview={false}
                  onDownload={async () => {
                    // Generate and store invoice
                    const order = orders.find(o => o.id === showPreview);
                    if (order) {
                      await handleGenerateInvoice(order);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setShowPreview(null);
                    setPreviewInvoice(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices History */}
      {invoices.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice History</h3>
          <div className="space-y-3">
            {invoices.map(invoice => (
              <div key={invoice.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Invoice #{invoice.invoice_number}
                  </p>
                  <p className="text-xs text-gray-500">
                    Generated: {formatDate(invoice.generated_at || invoice.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(invoice.amount_due)}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {invoice.status}
                  </span>
                  <button
                    onClick={() => handleDownloadInvoice(invoice)}
                    disabled={loading === invoice.id}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                  >
                    {loading === invoice.id ? (
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInvoices;