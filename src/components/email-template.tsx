import React from 'react';

interface EmailTemplateProps {
  username: string;
  email: string;
  otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  email,
  otp,
}) => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hello, {username}!
        </h1>
        <p className="text-gray-600 mt-2">
          You requested to verify your email address{' '}
          <span className="font-medium text-gray-800">{email}</span>.
        </p>
        <p className="text-gray-600 mt-4">
          Please use the following OTP to complete your verification process. This OTP is valid for 10 minutes:
        </p>
        <div className="mt-6">
          <p className="text-center text-3xl font-bold text-blue-600 tracking-wider bg-gray-100 rounded-md py-2">
            {otp}
          </p>
        </div>
        <p className="text-gray-500 mt-6 text-sm">
          If you did not request this, please ignore this email. For any issues, contact our support team.
        </p>
        <div className="mt-8">
          <p className="text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} Mysterious Feedback Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
