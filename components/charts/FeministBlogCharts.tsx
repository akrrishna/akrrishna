'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Define colors that work in both light and dark mode
const chartTheme = {
  text: '#6b7280', // gray-500
  grid: '#e5e7eb', // gray-200
  darkText: '#d1d5db', // gray-300
  darkGrid: '#374151', // gray-700
};

export const ViolenceChart = () => {
  const violenceData = [
    { type: 'Rape', cases: 2380 },
    { type: 'Attempted Rape', cases: 655 },
    { type: 'Child Sexual Abuse', cases: 314 },
    { type: 'Abduction & Rape', cases: 72 },
    { type: 'Murder after Rape', cases: 9 }
  ];

  return (
    <div className="w-full my-8 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
      <h3 className="text-center font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-gray-100">
        Registered Sexual Violence Cases in Nepal (FY 2078/79)
      </h3>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={violenceData} margin={{ top: 20, right: 10, left: 10, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} opacity={0.6} />
            <XAxis 
              dataKey="type" 
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={10} 
              tick={{ fill: chartTheme.text }}
              stroke={chartTheme.text}
              interval={0}
            />
            <YAxis 
              label={{ 
                value: 'Number of Cases', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: chartTheme.text, fontSize: 12 }
              }}
              tick={{ fill: chartTheme.text, fontSize: 10 }}
              stroke={chartTheme.text}
              width={50}
            />
            <Tooltip 
              formatter={(value) => [`${value} cases`, 'Registered Cases']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#111827',
                fontSize: '12px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingTop: '10px' }}
              content={() => (
                <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Total Cases: 3,430 | Source: Nepal Police
                </div>
              )}
            />
            <Bar dataKey="cases" fill="#ef4444" name="Reported Cases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const HarassmentChart = () => {
  const harassmentData = [
    { location: 'Public Transport', percentage: 97 },
    { location: 'Schools', percentage: 76 },
    { location: 'Online', percentage: 66.5 }
  ];

  return (
    <div className="w-full my-8 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
      <h3 className="text-center font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-gray-100">
        Sexual Harassment Rates by Location (Kathmandu Valley)
      </h3>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={harassmentData} margin={{ top: 20, right: 10, left: 10, bottom: 80 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} opacity={0.6} />
            <XAxis 
              dataKey="location" 
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={10}
              tick={{ fill: chartTheme.text }}
              stroke={chartTheme.text}
              interval={0}
            />
            <YAxis 
              label={{ 
                value: 'Percentage (%)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: chartTheme.text, fontSize: 12 }
              }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fill: chartTheme.text, fontSize: 10 }}
              stroke={chartTheme.text}
              width={40}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Harassment Rate']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#111827',
                fontSize: '12px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingTop: '10px' }}
              content={() => (
                <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                  Percentage of women who experienced harassment in each location
                </div>
              )}
            />
            <Bar dataKey="percentage" fill="#ef4444" name="Women Affected" maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ViolenceStatCard = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-red-500 p-4 sm:p-6 my-8 rounded-r-lg shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Partner Violence Statistics (Nepal 2022)
          </h3>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            According to the Nepal Demographic and Health Survey 2022
          </p>
        </div>
        <div className="text-center sm:text-right">
          <div className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400">27.2%</div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            of women aged 15-49<br />experienced violence<br />from their partners
          </p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-400">
          More than 1 in 4 women experience violence from their partners
        </p>
      </div>
    </div>
  );
};

export const GBVDonutChart = () => {
  const data = [
    { name: 'Domestic Violence', value: 78.82, color: '#ea580c' },
    { name: 'Rape Cases', value: 11.18, color: '#dc2626' },
    { name: 'Other GBV', value: 10, color: '#fbbf24' }
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.name}: ${entry.value}%`;
  };

  return (
    <div className="my-8 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
      <h3 className="text-center font-bold text-base sm:text-lg mb-4 text-gray-900 dark:text-gray-100">
        Distribution of Gender-Based Violence Cases (FY 2078/79)
      </h3>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#111827',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4 px-2">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Total cases: ~21,380 | Rape cases: 2,380 | Domestic violence: 17,000
        </p>
      </div>
    </div>
  );
};