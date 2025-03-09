import React from "react";

import { assets } from "../assets/Common/assets"; // Import assets

const PrivacyPolicy = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto p-10 pt-20 bg-white rounded-lg flex flex-col items-center text-center gap-10">

        <div className="w-full md:w-4/5 text-center p-10">
          <h1 className="text-gray-900 font-bold text-3xl md:text-4xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            <b>
              At NeonBrush, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, and safeguard your data when
              you use our digital art gallery platform, where artists can sell
              their artworks and users can purchase them. By using NeonBrush,
              you agree to the practices described in this policy.
            </b>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>1. Information We Collect Personal Information</b>
            </h4>
            When you create an account, we collect information such as your
            name, email address, payment details, and shipping address (if
            applicable). Artwork Information: Artists may upload details about
            their artworks, including images, descriptions, and pricing. Usage
            Data: We collect information about how you interact with our
            platform, such as browsing history, search queries, and purchase
            history. Technical Data: We may collect device information, IP
            addresses, browser type, and operating system to improve platform
            functionality and security.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>2. How We Use Your Information</b>
            </h4>{" "}
            To facilitate the buying and selling of artworks on NeonBrush. To
            process payments and deliver purchased artworks to buyers. To
            communicate with you about your account, orders, or platform
            updates. To improve our platform, personalize your experience, and
            provide customer support. To send promotional offers, newsletters,
            or updates (you can opt out at any time). To comply with legal
            obligations and protect against fraudulent activities.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>3. Sharing Your Information With Artists/Buyers</b>
            </h4>
            Necessary information (e.g., shipping details) is shared to complete
            transactions. Service Providers: We may share data with third-party
            vendors for payment processing, shipping, or platform maintenance.
            Legal Requirements: We may disclose information if required by law
            or to protect our rights and safety. Aggregated Data: Non-personal,
            anonymized data may be shared for analytics or marketing purposes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>4. Data Security</b>
            </h4>{" "}
            We implement industry-standard security measures to protect your
            data, including encryption, secure servers, and regular security
            audits. However, no online platform can guarantee absolute security,
            so we encourage you to use strong passwords and keep your account
            information confidential.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>5. Your Rights Access and Correction</b>
            </h4>{" "}
            You can access and update your personal information in your account
            settings. Data Deletion: You may request the deletion of your
            account and associated data, subject to legal obligations. Opt-Out:
            You can unsubscribe from marketing communications at any time.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>6. Changes to This Policy</b>
            </h4>{" "}
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page, and we will notify you of significant updates.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <h4>
              <b>7. Contact Us</b>
            </h4>
            If you have questions or concerns about this Privacy Policy or your
            data,please contact us at contact@neonbrush.com
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
