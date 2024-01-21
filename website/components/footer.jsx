const Footer = ({ setSelectedPage }) => {
  return (
    <>
      <footer className="flex flex-col items-center bg-gray-800 text-center dark:bg-gray-800 lg:text-left">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline">
              Third Street Journal™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                onClick={() => {
                  setSelectedPage("home");
                }}
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedPage("chat");
                }}
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                Chat
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedPage("stocks");
                }}
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                Stocks
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSelectedPage("about");
                }}
                href="#"
                className="hover:underline"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
