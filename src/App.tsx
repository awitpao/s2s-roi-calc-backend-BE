import React, { useState, useMemo } from 'react';
import { Briefcase, ChevronRight, ExternalLink, LineChart, ShieldCheck, Users, TrendingDown, Info, PieChart } from 'lucide-react';

// Convert hourly to annual based on 2080 hours (40 hrs/week * 52 weeks)
const ANNUAL_HOURS = 2080;

const staffingData = [
  { role: "Accountant", level: "Mid-level", rateMin: 14, rateMax: 18, usMin: 60000, usMax: 75000 },
  { role: "Accountant", level: "Senior", rateMin: 18, rateMax: 21, usMin: 75000, usMax: 90000 },
  { role: "Accountant", level: "Lead", rateMin: 21, rateMax: 26, usMin: 90000, usMax: 110000 },
  { role: "Admin Specialist", level: "Mid-level", rateMin: 11, rateMax: 14, usMin: 40000, usMax: 50000 },
  { role: "Admin Specialist", level: "Senior", rateMin: 14, rateMax: 16, usMin: 50000, usMax: 65000 },
  { role: "Admin Specialist", level: "Lead", rateMin: 16, rateMax: 18, usMin: 65000, usMax: 80000 },
  { role: "Billing Specialist", level: "Mid-level", rateMin: 12, rateMax: 14, usMin: 45000, usMax: 55000 },
  { role: "Billing Specialist", level: "Senior", rateMin: 14, rateMax: 16, usMin: 50000, usMax: 60000 },
  { role: "Billing Specialist", level: "Lead", rateMin: 16, rateMax: 18, usMin: 55000, usMax: 70000 },
  { role: "Bookkeeper", level: "Mid-level", rateMin: 13, rateMax: 15, usMin: 50000, usMax: 60000 },
  { role: "Bookkeeper", level: "Senior", rateMin: 15, rateMax: 18, usMin: 60000, usMax: 75000 },
  { role: "Bookkeeper", level: "Lead", rateMin: 18, rateMax: 21, usMin: 75000, usMax: 90000 },
  { role: "Chief of Staff", level: "Mid-level", rateMin: 16, rateMax: 18, usMin: 80000, usMax: 100000 },
  { role: "Chief of Staff", level: "Senior", rateMin: 18, rateMax: 21, usMin: 100000, usMax: 120000 },
  { role: "Chief of Staff", level: "Lead", rateMin: 20, rateMax: 26, usMin: 120000, usMax: 160000 },
  { role: "Copywriter", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 55000, usMax: 65000 },
  { role: "Copywriter", level: "Senior", rateMin: 16, rateMax: 18, usMin: 65000, usMax: 85000 },
  { role: "Copywriter", level: "Lead", rateMin: 18, rateMax: 21, usMin: 85000, usMax: 100000 },
  { role: "Customer Service (Bilingual)", level: "Mid-level", rateMin: 15, rateMax: 16, usMin: 40000, usMax: 45000 },
  { role: "Customer Service (Bilingual)", level: "Senior", rateMin: 16, rateMax: 17, usMin: 45000, usMax: 55000 },
  { role: "Customer Service (Bilingual)", level: "Lead", rateMin: 17, rateMax: 19, usMin: 55000, usMax: 65000 },
  { role: "Customer Service (Voice)", level: "Mid-level", rateMin: 13, rateMax: 14, usMin: 35000, usMax: 45000 },
  { role: "Customer Service (Voice)", level: "Senior", rateMin: 14, rateMax: 15, usMin: 45000, usMax: 55000 },
  { role: "Customer Service (Voice)", level: "Lead", rateMin: 15, rateMax: 17, usMin: 55000, usMax: 65000 },
  { role: "Customer Support (Non-Voice)", level: "Mid-level", rateMin: 12, rateMax: 13, usMin: 35000, usMax: 40000 },
  { role: "Customer Support (Non-Voice)", level: "Senior", rateMin: 13, rateMax: 14, usMin: 40000, usMax: 50000 },
  { role: "Customer Support (Non-Voice)", level: "Lead", rateMin: 14, rateMax: 15, usMin: 50000, usMax: 60000 },
  { role: "Executive Assistant", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 60000, usMax: 75000 },
  { role: "Executive Assistant", level: "Senior", rateMin: 16, rateMax: 18, usMin: 75000, usMax: 95000 },
  { role: "Executive Assistant", level: "Lead", rateMin: 18, rateMax: 21, usMin: 95000, usMax: 120000 },
  { role: "Government RFP & Grants Specialist", level: "Mid-level", rateMin: 16, rateMax: 18, usMin: 65000, usMax: 85000 },
  { role: "Government RFP & Grants Specialist", level: "Senior", rateMin: 18, rateMax: 21, usMin: 85000, usMax: 110000 },
  { role: "Government RFP & Grants Specialist", level: "Lead", rateMin: 21, rateMax: 26, usMin: 110000, usMax: 140000 },
  { role: "Graphic Designer", level: "Mid-level", rateMin: 15, rateMax: 17, usMin: 55000, usMax: 70000 },
  { role: "Graphic Designer", level: "Senior", rateMin: 17, rateMax: 19, usMin: 70000, usMax: 90000 },
  { role: "Graphic Designer", level: "Lead", rateMin: 19, rateMax: 21, usMin: 90000, usMax: 110000 },
  { role: "HR Operations Specialist", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 55000, usMax: 70000 },
  { role: "HR Operations Specialist", level: "Senior", rateMin: 16, rateMax: 18, usMin: 70000, usMax: 90000 },
  { role: "HR Operations Specialist", level: "Lead", rateMin: 18, rateMax: 21, usMin: 85000, usMax: 105000 },
  { role: "Lead Gen & Marketing Specialist", level: "Mid-level", rateMin: 16, rateMax: 18, usMin: 60000, usMax: 70000 },
  { role: "Lead Gen & Marketing Specialist", level: "Senior", rateMin: 18, rateMax: 21, usMin: 70000, usMax: 95000 },
  { role: "Lead Gen & Marketing Specialist", level: "Lead", rateMin: 21, rateMax: 24, usMin: 95000, usMax: 115000 },
  { role: "Lead Generation Specialist", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 55000, usMax: 65000 },
  { role: "Lead Generation Specialist", level: "Senior", rateMin: 16, rateMax: 18, usMin: 65000, usMax: 85000 },
  { role: "Lead Generation Specialist", level: "Lead", rateMin: 18, rateMax: 21, usMin: 85000, usMax: 100000 },
  { role: "Onboarding Specialist", level: "Mid-level", rateMin: 13, rateMax: 15, usMin: 50000, usMax: 65000 },
  { role: "Onboarding Specialist", level: "Senior", rateMin: 15, rateMax: 17, usMin: 60000, usMax: 75000 },
  { role: "Onboarding Specialist", level: "Lead", rateMin: 17, rateMax: 19, usMin: 75000, usMax: 90000 },
  { role: "Operations Coordinator", level: "Mid-level", rateMin: 13, rateMax: 15, usMin: 50000, usMax: 60000 },
  { role: "Operations Coordinator", level: "Senior", rateMin: 15, rateMax: 17, usMin: 60000, usMax: 75000 },
  { role: "Operations Coordinator", level: "Lead", rateMin: 17, rateMax: 19, usMin: 75000, usMax: 90000 },
  { role: "Project Coordinator", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 55000, usMax: 65000 },
  { role: "Project Coordinator", level: "Senior", rateMin: 16, rateMax: 18, usMin: 65000, usMax: 85000 },
  { role: "Project Coordinator", level: "Lead", rateMin: 18, rateMax: 21, usMin: 85000, usMax: 100000 },
  { role: "Quality Assurance Specialist", level: "Mid-level", rateMin: 14, rateMax: 15, usMin: 60000, usMax: 75000 },
  { role: "Quality Assurance Specialist", level: "Senior", rateMin: 15, rateMax: 16, usMin: 75000, usMax: 95000 },
  { role: "Quality Assurance Specialist", level: "Lead", rateMin: 16, rateMax: 17, usMin: 95000, usMax: 110000 },
  { role: "Sales Assistant", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 40000, usMax: 50000 },
  { role: "Sales Assistant", level: "Senior", rateMin: 16, rateMax: 18, usMin: 50000, usMax: 65000 },
  { role: "Sales Assistant", level: "Lead", rateMin: 18, rateMax: 21, usMin: 65000, usMax: 80000 },
  { role: "Social Media Marketing Specialist", level: "Mid-level", rateMin: 14, rateMax: 16, usMin: 50000, usMax: 65000 },
  { role: "Social Media Marketing Specialist", level: "Senior", rateMin: 16, rateMax: 17, usMin: 65000, usMax: 85000 },
  { role: "Social Media Marketing Specialist", level: "Lead", rateMin: 17, rateMax: 18, usMin: 85000, usMax: 100000 },
  { role: "Subsidy Specialist", level: "Mid-level", rateMin: 13, rateMax: 14, usMin: 45000, usMax: 55000 },
  { role: "Subsidy Specialist", level: "Senior", rateMin: 14, rateMax: 15, usMin: 55000, usMax: 65000 },
  { role: "Subsidy Specialist", level: "Lead", rateMin: 15, rateMax: 16, usMin: 65000, usMax: 75000 },
  { role: "Talent Acquisition Specialist", level: "Mid-level", rateMin: 15, rateMax: 17, usMin: 65000, usMax: 85000 },
  { role: "Talent Acquisition Specialist", level: "Senior", rateMin: 17, rateMax: 19, usMin: 80000, usMax: 100000 },
  { role: "Talent Acquisition Specialist", level: "Lead", rateMin: 19, rateMax: 22, usMin: 100000, usMax: 120000 },
  { role: "Tech / IT Specialist", level: "Mid-level", rateMin: 16, rateMax: 18, usMin: 70000, usMax: 85000 },
  { role: "Tech / IT Specialist", level: "Senior", rateMin: 18, rateMax: 20, usMin: 85000, usMax: 110000 },
  { role: "Tech / IT Specialist", level: "Lead", rateMin: 20, rateMax: 22, usMin: 110000, usMax: 140000 },
  { role: "Video Editor", level: "Mid-level", rateMin: 16, rateMax: 18, usMin: 50000, usMax: 65000 },
  { role: "Video Editor", level: "Senior", rateMin: 18, rateMax: 20, usMin: 65000, usMax: 85000 },
  { role: "Video Editor", level: "Lead", rateMin: 20, rateMax: 22, usMin: 85000, usMax: 105000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function App() {
  const [selectedRole, setSelectedRole] = useState(staffingData[0].role);
  
  // Extract unique roles for the dropdown
  const roles = useMemo(() => {
    return Array.from(new Set(staffingData.map(d => d.role))).sort();
  }, []);

  // Filter available levels based on selected role
  const availableLevels = useMemo(() => {
    return staffingData.filter(d => d.role === selectedRole).map(d => d.level);
  }, [selectedRole]);

  // Set default level when role changes
  const [selectedLevel, setSelectedLevel] = useState(availableLevels[0]);

  // Handle role change safely
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    const newLevels = staffingData.filter(d => d.role === newRole).map(d => d.level);
    setSelectedLevel(newLevels[0]);
  };

  const currentData = useMemo(() => {
    return staffingData.find(d => d.role === selectedRole && d.level === selectedLevel) || staffingData[0];
  }, [selectedRole, selectedLevel]);

  // Calculations
  const ourCostMin = currentData.rateMin * ANNUAL_HOURS;
  const ourCostMax = currentData.rateMax * ANNUAL_HOURS;
  
  // Calculate Savings (Conservative: US Min vs Our Max, Optimistic: US Max vs Our Min)
  const savingsMin = currentData.usMin - ourCostMax;
  const savingsMax = currentData.usMax - ourCostMin;
  const averageSavings = (savingsMin + savingsMax) / 2;
  const savingsPercentage = Math.round((averageSavings / ((currentData.usMin + currentData.usMax) / 2)) * 100);

  // Helper to format breakdown amounts based on percentage
  const formatBreakdownAmount = (percentage: number) => {
    const minAmount = ourCostMin * percentage;
    const maxAmount = ourCostMax * percentage;
    return minAmount === maxAmount
      ? formatCurrency(minAmount)
      : `${formatCurrency(minAmount)} to ${formatCurrency(maxAmount)}`;
  };

  // Generate Google Jobs Link dynamically
  const googleJobsUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${currentData.level} ${currentData.role} salary`
  )}&ibp=htl;jobs`;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Remote Hiring <span className="text-rose-600">ROI Calculator</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Compare the estimated annual cost of a dedicated Structure 2 Scale team member with a comparable U.S.-based hire
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
              <Briefcase className="w-5 h-5 mr-2 text-rose-500" />
              Build your Comparison
            </h2>
            
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Role
                </label>
                <div className="relative">
                  <select 
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Level Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience Level
                </label>
                <div className="relative">
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow"
                  >
                    {availableLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-start text-sm text-slate-500 bg-rose-50/50 p-4 rounded-xl">
                  <Info className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p>
                    Calculations are based on standard full-time hours (<span className="font-semibold text-slate-700">2,080 hrs/yr</span>). US averages represent base salaries and exclude local hiring costs like benefits and taxes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Output / Dashboard */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Stat Cards Stacked vertically */}
            <div className="grid grid-cols-1 gap-6">
              
              {/* US Avg Rate Card (Now on top) */}
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-500 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    US Average Salary
                  </h3>
                </div>
                <div className="overflow-hidden mb-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 tracking-tight leading-tight whitespace-nowrap">
                    {currentData.usMin === currentData.usMax ? (
                      <span>{formatCurrency(currentData.usMin)}</span>
                    ) : (
                      <>
                        <span>{formatCurrency(currentData.usMin)}</span>
                        <span className="text-xl sm:text-2xl font-medium text-slate-400 mx-2">to</span>
                        <span>{formatCurrency(currentData.usMax)}</span>
                      </>
                    )}
                  </div>
                  <div className="text-slate-500 text-sm mb-2 font-medium">
                    {currentData.usMin === currentData.usMax ? (
                      `~$${(currentData.usMin / ANNUAL_HOURS).toFixed(2)} / hr`
                    ) : (
                      `~$${(currentData.usMin / ANNUAL_HOURS).toFixed(2)} to $${(currentData.usMax / ANNUAL_HOURS).toFixed(2)} / hr`
                    )}
                  </div>
                  <a 
                    href={googleJobsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    Verify on Google Jobs <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>

              {/* Our Rate Card (Now below US average) */}
              <div className="bg-gradient-to-br from-rose-600 to-red-800 rounded-2xl p-6 shadow-lg shadow-rose-900/20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="font-medium text-rose-100 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Estimated Annual Investment
                  </h3>
                </div>
                <div className="relative z-10 overflow-hidden">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight leading-tight whitespace-nowrap">
                    {ourCostMin === ourCostMax ? (
                      <span>{formatCurrency(ourCostMin)}</span>
                    ) : (
                      <>
                        <span>{formatCurrency(ourCostMin)}</span>
                        <span className="text-xl sm:text-2xl font-medium text-rose-300 mx-2">to</span>
                        <span>{formatCurrency(ourCostMax)}</span>
                      </>
                    )}
                  </div>
                  <div className="text-rose-200 text-sm leading-tight whitespace-nowrap">
                    {currentData.rateMin === currentData.rateMax ? (
                      `$${currentData.rateMin.toFixed(2)} / hr`
                    ) : (
                      `$${currentData.rateMin.toFixed(2)} to $${currentData.rateMax.toFixed(2)} / hr`
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Savings Big Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2 text-emerald-500" />
                      Your Estimated Savings
                    </h3>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 tracking-tight leading-tight mt-2 whitespace-nowrap">
                      {savingsMin === savingsMax ? (
                        <span>{formatCurrency(savingsMin)}</span>
                      ) : (
                        <>
                          <span>{formatCurrency(savingsMin)}</span> <span className="text-xl sm:text-2xl lg:text-3xl text-emerald-400 font-bold">to</span>
                          <br />
                          <span>{formatCurrency(savingsMax)}</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-500 mt-4 font-medium">
                      Per employee, per year.
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center min-w-[160px]">
                    <div className="text-sm font-semibold text-emerald-700 mb-1">Cost Reduction</div>
                    <div className="text-4xl font-extrabold text-emerald-600">~{savingsPercentage}%</div>
                  </div>

                </div>
              </div>
              
              {/* Additional Value Add footer */}
              <div className="bg-slate-50 px-6 md:px-8 py-4 border-t border-slate-100">
                <p className="text-sm text-slate-600 flex items-center justify-center md:justify-start">
                  <LineChart className="w-4 h-4 mr-2 text-rose-500" />
                  <strong>Hidden Bonus:</strong> US hiring adds ~25% in taxes and benefits. Your true savings are likely much higher!
                </p>
              </div>
            </div>

            {/* Rate Breakdown Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-rose-500" />
                Estimated Breakdown
              </h3>
              
              <div className="space-y-5">
                {/* Payroll */}
                <div>
                  <div className="flex justify-between text-sm mb-2 flex-wrap sm:flex-nowrap gap-1">
                    <span className="font-semibold text-slate-700">
                      Talent's Payroll <span className="font-normal text-slate-500 ml-1">({formatBreakdownAmount(0.70)})</span>
                    </span>
                    <span className="font-bold text-slate-900">70%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-rose-600 h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Bonuses */}
                <div>
                  <div className="flex justify-between text-sm mb-2 flex-wrap sm:flex-nowrap gap-1">
                    <span className="font-semibold text-slate-700">
                      Quarterly Bonuses <span className="font-normal text-slate-500 ml-1">({formatBreakdownAmount(0.15)})</span>
                    </span>
                    <span className="font-bold text-slate-900">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-rose-500 h-3 rounded-full opacity-90" style={{ width: '15%' }}></div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <div className="flex justify-between text-sm mb-2 flex-wrap sm:flex-nowrap gap-1">
                    <span className="font-semibold text-slate-700">
                      Benefits (Healthcare, local statutory allowances, and talent recognition) <span className="font-normal text-slate-500 ml-1">({formatBreakdownAmount(0.10)})</span>
                    </span>
                    <span className="font-bold text-slate-900">10%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-rose-400 h-3 rounded-full opacity-80" style={{ width: '10%' }}></div>
                  </div>
                </div>

                {/* TWB Program */}
                <div>
                  <div className="flex justify-between text-sm mb-2 flex-wrap sm:flex-nowrap gap-1">
                    <span className="font-semibold text-slate-700">
                      Talent Development & Community (Talent Without Borders training, coaching, and community support) <span className="font-normal text-slate-500 ml-1">({formatBreakdownAmount(0.05)})</span>
                    </span>
                    <span className="font-bold text-slate-900">5%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-rose-300 h-3 rounded-full opacity-70" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}