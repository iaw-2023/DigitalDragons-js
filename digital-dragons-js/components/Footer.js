const Footer = () => {
  return (
    <footer className=" text-white py-4">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow"></div>
        <div className=" bg-gray-500 container mx-auto text-center">
          <p className="text-sm mb-2">
            Todos los derechos reservados &copy; {new Date().getFullYear()} Digital Travels.
          </p>
          <p className="text-sm">
            Desarrollado por <span className="font-bold">Main Dragons</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
