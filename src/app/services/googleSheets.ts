export interface BookingData {
  id: string;
  ownerName: string;
  petName: string;
  petType: string;
  service: string;
  dateTime: string;
  phone: string;
  status?: string;
}

// ใส่ Google Apps Script Web App URL ของคุณที่นี่
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

export class GoogleSheetsService {
  private scriptUrl: string;

  constructor(scriptUrl: string = GOOGLE_SCRIPT_URL) {https://script.google.com/macros/s/AKfycbyPdA4wR-xhgIuDeRdogGhMw38lqrNLrIwpABLnEHD6n6MUcEOORfbnbzfQPF7YOiZ-/exec
    this.scriptUrl = scriptUrl;
  }

  async getBookings(): Promise<BookingData[]> {
    try {
      const response = await fetch(`${this.scriptUrl}?action=getBookings`);

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      return data.bookings || [];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async updateBookingStatus(id: string, status: string): Promise<boolean> {
    try {
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateStatus',
          id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  async deleteBooking(id: string): Promise<boolean> {
    try {
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteBooking',
          id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
