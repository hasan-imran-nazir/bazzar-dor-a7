
const Footer = () => {
  return (
    <div className="bg-[#f8faf8] ">
      <footer className="container mx-auto border-t border-gray-200/60 py-6 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600 font-medium">
          <p className="text-center sm:text-left">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p className="text-center sm:text-right text-gray-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
