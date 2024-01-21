import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const NewsPage = () => {
  let [newsData, setNewsData] = useState([]);
  const [count, setCount] = useState(0);
  const [popUpIndex, setPopUpIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const pullNews = async () => {
    try {
      const url = "http://127.0.0.1:5050/news";
      const messageResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (messageResponse.ok) {
        console.log("News information recieved successfully!");
        const responseBody = await messageResponse.json();
        setNewsData(JSON.parse(responseBody.text));
        // Handle success, e.g., navigate to the chat page
      } else {
        console.error("DB response failed!");
        // Handle failure
      }
    } catch (error) {
      console.error("Error occurred during messaging!:", error);
      // Handle error
    }
  };

  if (count === 0) {
    setCount(1);
    pullNews();
  }

  const openPopup = (number) => {
    setPopUpIndex(number);
    setOpen(true);
  };

  const closePopup = () => {
    setPopUpIndex(-1);
    setOpen(false);
  };

  return (
    <>
      <div className="container mx-auto mt-5 p-5">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold font-serif mb-3">
            Today's Headlines
          </h1>
          <p className="text-lg font-serif text-center">
            Explore today's financial headlines at Third Street Journal
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          {newsData.map((item, index) => (
            <button
              key={index}
              onClick={() => openPopup(index)}
              className="bg-white rounded-xl border border-gray-300 p-5"
            >
              <h1 className="text-2xl font-bold font-serif mb-2">
                {item.title}
              </h1>
              <p className="text-lg font-serif mb-4">{item.description}</p>
            </button>
          ))}
        </div>
        {popUpIndex === -1 ? null : (
          <>
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <Dialog.Title
                                as="h3"
                                className="text-base font-semibold leading-6 text-gray-900"
                              >
                                {newsData[popUpIndex].title}
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  {newsData[popUpIndex].summary}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-center items-center sm:flex sm:flex-row-reverse sm:px-6">
                          <a
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 sm:ml-3 sm:w-auto"
                            href={newsData[popUpIndex].url}
                            target="_blank"
                          >
                            Read Article
                          </a>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => closePopup()}
                            ref={cancelButtonRef}
                          >
                            Close
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </>
        )}
      </div>
    </>
  );
};

export default NewsPage;
