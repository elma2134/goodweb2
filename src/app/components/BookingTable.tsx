import { Calendar, Phone, Trash2, PawPrint } from 'lucide-react';
import type { Booking } from './Dashboard';

interface BookingTableProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<Booking['status'], string> = {
  'รอยืนยัน': 'bg-orange-100 text-orange-700 border-orange-200',
  'ยืนยันแล้ว': 'bg-green-100 text-green-700 border-green-200',
  'เสร็จสิ้น': 'bg-purple-100 text-purple-700 border-purple-200',
  'ยกเลิก': 'bg-red-100 text-red-700 border-red-200',
};

export function BookingTable({ bookings, onUpdateStatus, onDelete }: BookingTableProps) {
  const formatDateTime = (dateTimeString: string) => {
    try {
      const date = new Date(dateTimeString);
      if (isNaN(date.getTime())) {
        return dateTimeString;
      }
      return date.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateTimeString;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อเจ้าของ</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อน้อง</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ประเภท</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">บริการ</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">วันเวลา</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">เบอร์โทร</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สถานะ</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  ไม่พบข้อมูลการจอง
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-700 font-semibold">
                          {booking.ownerName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{booking.ownerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-pink-500" />
                      <span className="font-medium text-gray-900">{booking.petName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{booking.petType}</td>
                  <td className="px-6 py-4 text-gray-700">{booking.service}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDateTime(booking.dateTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {booking.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) => onUpdateStatus(booking.id, e.target.value as Booking['status'])}
                      className={`px-3 py-1.5 rounded-full border text-sm font-medium outline-none cursor-pointer ${
                        statusColors[booking.status]
                      }`}
                    >
                      <option value="รอยืนยัน">รอยืนยัน</option>
                      <option value="ยืนยันแล้ว">ยืนยันแล้ว</option>
                      <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                      <option value="ยกเลิก">ยกเลิก</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        if (confirm(`ต้องการลบการจองของ ${booking.ownerName} (${booking.petName}) ใช่หรือไม่?`)) {
                          onDelete(booking.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="ลบ"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
