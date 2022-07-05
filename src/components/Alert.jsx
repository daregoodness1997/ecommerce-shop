import { Fragment, useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import {
  Transition,
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

export const Alert = ({
  title = 'Order completed',
  isBody = true,
  body = 'Lorem ipsum dolor sit amet consectetur ',
  isAction = false,
  open = false,
}) => {
  const [openToast, setOpenToast] = useState(open);

  useEffect(() => {
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  }, []);

  return (
    <CSSTransition in={open} timeout={1500} unmountOnExit>
      <div className='rounded-md bg-green-50 p-6 fixed top-2 z-50 border-solid border border-green-400 w-full md:w-auto md:right-4 lg:w-auto lg:right-4 lg: top-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <CheckCircleIcon
              className='h-5 w-5 text-green-400'
              aria-hidden='true'
            />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-green-800'>{title}</h3>
            {isBody && (
              <div className='mt-2 text-sm text-green-700'>
                <p>{body}</p>
              </div>
            )}

            {isAction && (
              <div className='mt-4'>
                <div className='-mx-2 -my-1.5 flex'>
                  <button
                    type='button'
                    className='bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600'
                  >
                    View status
                  </button>
                  <button
                    type='button'
                    className='ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600'
                    onClick={() => setOpenToast(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
