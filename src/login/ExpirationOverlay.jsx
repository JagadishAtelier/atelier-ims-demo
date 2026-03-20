import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpirationOverlay = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="relative max-w-4xl w-full flex flex-col items-center">
    


        {/* Bottom Section: CTA and Illustration Area */}
        <div className=" text-center z-10">

          <div className="mb-8 flex justify-center h-70">
            <img src='https://img.freepik.com/premium-vector/system-update_773186-778.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80'/>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Demo version has expired!
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            To continue using Portal, you need to pick a plan
          </p>
          
          <button onClick={()=>navigate("/")} className="bg-[#10B981] hover:bg-[#059669] !text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-95">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpirationOverlay;