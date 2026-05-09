import { useState, useEffect } from 'react';
import { LogOut, Calendar, Clock, User, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { BookingTable } from './BookingTable';
import { googleSheetsService, type BookingData } from '../services/googleSheets';

interface DashboardProps {
  currentUser: string;
  onLogout: () => void;
}

export interface Booking {
  id: string;
  ownerName: string;
  petName: string;
  petType: string;
  service: string;
  dateTime: string;
  phone: string;
  status: 'รอยืนยัน' | 'ยืนยันแล้ว' | 'เสร็จสิ้น' | 'ยกเลิก';
}

export function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadBookings = async () => {
    try {
      setError(null);
      const data = await googleSheetsService.getBookings();

      const formattedBookings: Booking[] = data.map((item) => ({
        id: item.id,
        ownerName: item.ownerName,
        petName: item.petName,
        petType: item.petType,
        service: item.service,
        dateTime: item.dateTime,
        phone: item.phone,
        status: (item.status || 'รอยืนยัน') as Booking['status'],
      }));

      setBookings(formattedBookings);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลจาก Google Sheets ได้ กรุณาตรวจสอบ URL');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadBookings();
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm)
  );

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'ยืนยันแล้ว').length,
    pending: bookings.filter((b) => b.status === 'รอยืนยัน').length,
    completed: bookings.filter((b) => b.status === 'เสร็จสิ้น').length,
  };

  const handleUpdateStatus = async (id: string, status: Booking['status']) => {
    try {
      const success = await googleSheetsService.updateBookingStatus(id, status);
      if (success) {
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
      } else {
        alert('ไม่สามารถอัพเดทสถานะได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const success = await googleSheetsService.deleteBooking(id);
      if (success) {
        setBookings(bookings.filter((b) => b.id !== id));
      } else {
        alert('ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
      console.error(err);
    }
  };

  return (
    <div className="size-full bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">ระบบจองคิว Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{currentUser}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">{error}</p>
              <p className="text-sm text-red-700 mt-1">
                กรุณาตรวจสอบว่าได้ใส่ Google Apps Script Web App URL ที่ถูกต้องใน
                <code className="mx-1 px-2 py-0.5 bg-red-100 rounded">src/app/services/googleSheets.ts</code>
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">กำลังโหลดข้อมูลจาก Google Sheets...</p>
            </div>
          </div>
        ) : (
          <>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ทั้งหมด</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">รอยืนยัน</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ยืนยันแล้ว</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">เสร็จสิ้น</p>
                <p className="text-3xl font-bold text-purple-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาชื่อเจ้าของ, ชื่อน้อง, บริการ, หรือเบอร์โทร..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              รีเฟรช
            </button>
          </div>
        </div>

        {/* Booking Table */}
        <BookingTable
          bookings={filteredBookings}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDeleteBooking}
        />
          </>
        )}
      </main>
    </div>
  );
}
