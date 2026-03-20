import React, { useState } from "react";
import axios from "axios";
import { Building2, Mail, Phone, User } from "lucide-react";
import BASE_API from "../api/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const CompanyForm = () => {
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company_name: "",
    business_type: "",
    gst_number: "",
    owner_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ NEW: error state
  const [errors, setErrors] = useState({});

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // remove error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ VALIDATION FUNCTION
  const validateForm = () => {
    let newErrors = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required";
    }

    if (!formData.owner_name.trim()) {
      newErrors.owner_name = "Owner name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SEND OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ stop if validation fails
    if (!validateForm()) return;

    try {
      setLoading(true);

      await axios.post(`${BASE_API}/send-otp`, {
        email: formData.email,
      });

      setShowOtp(true);
      toast.success("OTP sent successfully to your email");

    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${BASE_API}/verify-otp`,
        {
          ...formData,
          otp,
        }
      );

      toast.success("Company & User Created Successfully");

      setShowOtp(false);
      setOtp("");
      
navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 sticky top-0 h-screen text-black">
        <div className="flex flex-col justify-center items-center text-center p-12 w-full">
          <img src="/signUpImg-2.png" alt="Inventory" className="mb-8 " />
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Smart Inventory & Billing
          </h2>
          <p className=" text-lg max-w-md">
            Manage stock, billing, GST, and reports — everything in one powerful platform built for growing businesses.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create Demo Account
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Start your free trial in seconds
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Company Name */}
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-medium">
                  Company Name
                </label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
                  <Building2 className="text-gray-400" size={18} />
                  <input
                    name="company_name"
                    onChange={handleChange}
                    className="w-full p-2.5 outline-none bg-transparent"
                  />
                </div>
                {errors.company_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Business Type
                </label>
                <select name="business_type" onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="">Select</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Pharmacy</option>
                  <option>Distributor</option>
                </select>
              </div>

              {/* GST */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  GST Number
                </label>
                <input name="gst_number" onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>

              {/* Owner */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Owner Name
                </label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
                  <User className="text-gray-400" size={18} />
                  <input
                    name="owner_name"
                    onChange={handleChange}
                    className="w-full p-2.5 outline-none bg-transparent"
                  />
                </div>
                {errors.owner_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.owner_name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Phone
                </label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
                  <Phone className="text-gray-400" size={18} />
                  <input
                    name="phone"
                    onChange={handleChange}
                    className="w-full p-2.5 outline-none bg-transparent"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-medium">
                  Email Address
                </label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
                  <Mail className="text-gray-400" size={18} />
                  <input
                    name="email"
                    onChange={handleChange}
                    className="w-full p-2.5 outline-none bg-transparent"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-medium">
                  Address
                </label>
                <textarea name="address" onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>

              {/* City */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  City
                </label>
                <input name="city" onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>

              {/* State */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  State
                </label>
                <input name="state" onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-[#506ee4] !text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
            >
              {loading ? "Sending OTP..." : "Start Free Demo"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 !mt-6">
            Already have an account?{" "}
            <span onClick={()=>navigate("/")} className="text-indigo-500 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>

        </div>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center flex flex-col gap-5">

            <h3 className="text-xl font-bold !mb-0">Verify OTP</h3>
            <p className="text-gray-500 text-sm !mb-0">
              Enter the OTP sent to your email
            </p>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full text-center tracking-[8px] text-lg border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="------"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full mt-5 bg-green-600 !text-white p-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Verify & Create Account
            </button>

            <button
              onClick={() => setShowOtp(false)}
              className="text-sm text-gray-400 mt-4 hover:underline"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default CompanyForm;