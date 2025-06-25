import React, { useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import { uploadFile } from '../../api/admin-api';

const DailyProfit = () => {
  const [fileName, setFileName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [previewData, setPreviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const fileInputRef = useRef(null);
  const [base64Data, setBase64Data] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadMessage("");
      // Read and preview Excel file
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setPreviewData(data);
      };
      reader.readAsBinaryString(file);
      // Read as base64 for upload
      const base64Reader = new FileReader();
      base64Reader.onload = (evt) => {
        const base64 = evt.target.result.split(',')[1]; // Remove data:...;base64,
        setBase64Data(base64);
      };
      base64Reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current.files[0]) {
      setUploadMessage("Please select an Excel file to upload.");
      return;
    }
    if (!base64Data) {
      setUploadMessage("File is not ready for upload. Try again.");
      return;
    }
    try {
      await uploadFile(base64Data);
      setUploadMessage("File uploaded successfully!");
      setFileName("");
      setBase64Data("");
      setPreviewData([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadMessage("Upload failed. Please try again.");
    }
  };

  // Pagination logic
  const totalRows = previewData.length > 1 ? previewData.length - 1 : 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedRows = previewData.length > 1
    ? previewData.slice(1 + (currentPage - 1) * rowsPerPage, 1 + currentPage * rowsPerPage)
    : [];

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePageClick = (page) => setCurrentPage(page);

  // Reset to first page when new file is uploaded
  React.useEffect(() => {
    setCurrentPage(1);
  }, [previewData]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">Daily Profit Upload</h1>
        <p className="text-slate-400">Upload an Excel file to update daily profit statistics for users.</p>
      </div>
      <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 max-w-md mx-auto">
        <label className="block mb-2 font-medium text-slate-200">Select Excel File (.xlsx, .xls):</label>
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-slate-700 border border-slate-600 rounded-xl"
        />
        {fileName && (
          <div className="mt-2 text-green-400 text-sm">Selected file: {fileName}</div>
        )}
        <button
          onClick={handleUpload}
          disabled={!fileName || !base64Data}
          className={`mt-4 w-full font-semibold py-2 px-4 rounded-lg transition-all ${(!fileName || !base64Data) ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          Upload
        </button>
        {uploadMessage && (
          <div className="mt-3 text-center text-blue-400 font-medium">{uploadMessage}</div>
        )}
      </div>
      {/* Preview Table */}
      <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Daily Profit Data Preview</h2>
        {previewData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700/50">
                <tr>
                  {previewData[0].map((col, idx) => (
                    <th key={idx} className="px-4 py-2 text-left text-slate-300 font-semibold text-sm">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 text-slate-200 text-sm">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === 1 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageClick(i + 1)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-blue-800 hover:text-white'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400">Daily profit data will be displayed here after uploading an Excel file.</p>
        )}

      </div>
    </div>
  )
}

export default DailyProfit
