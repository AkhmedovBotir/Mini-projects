import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Kalendar stil fayli
import 'react-date-range/dist/theme/default.css'; // Kalendar temasi

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [language, setLanguage] = useState('uz'); // Til uchun holat
  const [fromCurrency, setFromCurrency] = useState('USD'); // Konvertatsiya uchun boshlang'ich valyuta
  const [toCurrency, setToCurrency] = useState('UZS'); // Konvertatsiya uchun maqsad valyuta
  const [amount, setAmount] = useState(1); // Miqdor
  const [convertedAmount, setConvertedAmount] = useState(0); // Konvertatsiya natijasi

  // Tilni o'zgartirish funksiyasi
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Sana tanlanganda
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    fetchData(date);
  };

  // Ma'lumotlarni olish
  const fetchData = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    axios
      .get(`https://cbu.uz/uz/arkhiv-kursov-valyut/json/all/${formattedDate}/`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  // Konvertatsiya qilish
  const convertCurrency = () => {
    const fromRate = data.find((item) => item.Ccy === fromCurrency)?.Rate || 1;
    const toRate = data.find((item) => item.Ccy === toCurrency)?.Rate || 1;
    const result = (amount * fromRate) / toRate;
    setConvertedAmount(result.toFixed(2));
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, data]);

  // Tilga qarab nomlarni olish
  const getCurrencyName = (item) => {
    switch (language) {
      case 'ru':
        return item.CcyNm_RU;
      case 'en':
        return item.CcyNm_EN;
      default:
        return item.CcyNm_UZ;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Til almashtirish tugmalari */}
        <div className="flex justify-end space-x-4 mb-4">
          <button
            onClick={() => changeLanguage('uz')}
            className={`px-4 py-2 rounded ${language === 'uz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            O'zbekcha
          </button>
          <button
            onClick={() => changeLanguage('ru')}
            className={`px-4 py-2 rounded ${language === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Русский
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            English
          </button>
        </div>

        {/* Kalendar va jadval */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kalendar */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Kalendar</h2>
            <Calendar
              date={selectedDate}
              onChange={handleSelectDate}
              className="w-full"
            />
          </div>

          {/* Kurs kalkulyatori */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Kurs Kalkulyatori</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-1/2 p-2 border rounded"
                >
                  {data.map((item) => (
                    <option key={item.Ccy} value={item.Ccy}>
                      {item.Ccy}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={convertedAmount}
                  readOnly
                  className="w-1/2 p-2 border rounded"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-1/2 p-2 border rounded"
                >
                  {data.map((item) => (
                    <option key={item.Ccy} value={item.Ccy}>
                      {item.Ccy}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Jadval */}
        <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center bg-blue-500 text-white py-4">
            {language === 'ru' ? 'Курсы валют' : language === 'en' ? 'Currency Rates' : 'Valyuta Kurslari'}
          </h1>
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ru' ? 'Валюта' : language === 'en' ? 'Currency' : 'Valyuta'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ru' ? 'Сумма' : language === 'en' ? 'Amount' : 'Summa'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ru' ? 'Курс' : language === 'en' ? 'Rate' : 'Kurs'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ru' ? 'Название' : language === 'en' ? 'Name' : 'Nomi'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Ccy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Nominal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getCurrencyName(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}