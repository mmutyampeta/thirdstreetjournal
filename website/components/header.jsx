const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Chat Bot", href: "/chat", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ setSelectedPage }) => {
  /*
  const chatSetup = async ({ newPage }) => {
    setSelectedPage(newPage);
    try {
      const setupResponse = await fetch("http://127.0.0.1:5050/setupchat", {
        method: 'POST',  // Change the method to POST
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include a request body if needed
        body: JSON.stringify({}),
      });

      if (setupResponse.ok) {
        console.log('Chat setup successful');
        // Handle success, e.g., navigate to the chat page
      } else {
        console.error('Chat setup failed');
        // Handle failure
      }
    } catch (error) {
      console.error('Error during chat setup:', error);
      // Handle error
    }

  }
  */

  return (
    <>
      <div className="bg-gray-800 text-white p-4">
        <header className="bg-gray-800 text-white p-4 flex items-center justify-center">
          <div className="container mx-auto flex items-center justify-center">
            <button
              onClick={() => {
                setSelectedPage("home");
              }}
              className="text-4xl font-bold font-serif"
            >
              THIRD STREET JOURNAL
            </button>
          </div>
        </header>

        <div className="flex items-center justify-center">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <button
                className="font-serif text-gray-300 font-bold hover:text-white"
                onClick={() => {
                  setSelectedPage("home");
                }}
              >
                Home
              </button>

              <button
                className="font-serif text-gray-300 font-bold hover:text-white"
                onClick={() => setSelectedPage("chat")}
              >
                Chat
              </button>
              <button
                className="font-serif text-gray-300 font-bold hover:text-white"
                onClick={() => setSelectedPage("stocks")}
              >
                Stocks
              </button>
              <button
                className="font-serif text-gray-300 font-bold hover:text-white"
                onClick={() => {
                  setSelectedPage("about");
                }}
              >
                About
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

/*
<Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-800 text-white-900"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
*/
