import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function PokemonModal({visible, onClose, title,  children}) {

  return ( 
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center" >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-[800px] w-[900px] transform rounded-2xl bg-white shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex p-6 ">
                  <div className='w-full'>
                    <span className="text-2xl">{`${title.charAt(0).toUpperCase()}${title.slice(1)}`}</span>
                  </div>
                  <div className="flex items-center text-2xl cursor-pointer" onClick={onClose}>x</div>
                </Dialog.Title>
                <Dialog.Description as="div">
                  <div className="h-[700px] overflow-hidden">
                    {children}
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PokemonModal;