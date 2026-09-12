"use client"

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { LuArrowDownToLine, LuArrowUpToLine, LuWallet } from 'react-icons/lu';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { useBalanceStore } from './../../store/useBalanceStore'

export const Balance = () => {
    const { user } = useAuth();
    const { isVisible, toggleVisibility } = useBalanceStore()
    const { isVisible2, toggleVisibility2 } = useBalanceStore()

    return (
      <section className='w-full bg-white dark:bg-isoDark dark:text-white md:space-y-8'>
        <div className='py-6 px-4 flex justify-between items-center text-black md:border md:py-10 md:px-7 md:rounded-3xl md:border-neutral-200 border-b dark:border-neutral-600 border-neutral-100 w-full'>
            <div className='flex flex-col justify-start space-y-2 w-full'>
                <div className='flex items-center space-x-1.5'>
                    <span className='text-xs md:text-lg dark:text-neutral-400 md:font-semibold'>Est. Total Balance</span>
                    {
                        isVisible === true ? (
                            <RxEyeOpen onClick={toggleVisibility} className='h-4 w-4 text-neutral-400' />
                        ) : (
                            <RxEyeClosed onClick={toggleVisibility} className='h-4 w-4 text-neutral-400' />
                        )
                    }
                </div>
                <div className='flex flex-wrap space-y-2 justify-between w-full items-center'>
                    {
                        isVisible ? (
                            <h1 className='text-3xl dark:text-white font-semibold'>${user.balance.toLocaleString()}</h1>
                        ) : (
                            // <h1 className='text-3xl font-semibold'>****</h1>
                            <div className='flex space-x-1 items-center'>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                            </div>
                        )
                    }
                    <a href='/dashboard/deposit' className='w-fit flex text-base dark:bg-isoColor2 dark:text-black text-white space-x-1 items-center flex-nowrap px-3 py-2 rounded-full bg-isoColor1'>
                        <LuArrowDownToLine className='w-5 h-5' />
                        <span className='text-sm'>Deposit</span>
                    </a>
                </div>
            </div>
        </div>

        <div className='py-6 px-4 flex justify-between md:border md:py-10 md:px-7 md:rounded-3xl md:border-neutral-200 items-center dark:border-neutral-600 text-black border-b border-neutral-100 w-full'>
            <div className='flex flex-col justify-start space-y-2 w-full'>
                <div className='flex items-center space-x-1.5'>
                    <span className='text-xs md:text-lg dark:text-neutral-400 md:font-semibold'>Available Balance</span>
                    {
                        isVisible2 === true ? (
                            <RxEyeOpen onClick={toggleVisibility2} className='h-4 w-4 text-neutral-400' />
                        ) : (
                            <RxEyeClosed onClick={toggleVisibility2} className='h-4 w-4 text-neutral-400' />
                        )
                    }
                </div>
                <div className='flex flex-wrap space-y-2 duration-500 justify-between w-full items-center'>
                    
                    {
                        isVisible2 === true ? (
                            <h1 className='text-3xl duration-500 dark:text-white font-semibold'>${user.earnings.toLocaleString()}</h1>
                        ) : (
                            // <h1 className='text-3xl duration-500 font-semibold'>****</h1>
                            <div className='flex space-x-1 items-center'>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                                <span className='w-2.5 h-2.5 rounded-full dark:bg-white bg-black'></span>
                            </div>
                        )
                    }
                    <a href='/dashboard/withdrawal' className='w-fit flex text-base dark:bg-isoDark2 dark:text-isoColor2 text-isoColor1 space-x-1 items-center flex-nowrap px-3 py-2 rounded-full bg-blue-100'>
                        <LuArrowUpToLine className='w-5 h-5' />
                        <span className='text-sm'>Withdraw</span>
                    </a>
                </div>
            </div>
        </div>

        {/* <div className='py-6 px-4 flex justify-between items-center text-black border-b border-neutral-100 w-full'>
            <div className='flex flex-col justify-start space-y-0 w-full'>
                <div className='flex items-center space-x-1.5'>
                    <span className='text-xs text-neutral-400'>Make Seamless Transactions</span>
                </div>
                <div className='flex flex-wrap space-y-2 justify-between w-full items-center'>
                    <h1 className='text-base font-medium'>Import your crypto wallet to Metagram Network</h1>
                    <a href='#' className='w-fit flex text-base text-white space-x-1 items-center flex-nowrap px-3 py-2 rounded-full bg-[#000]'>
                        <LuWallet className='w-5 h-5' />
                        <span className='text-sm'>ConnectWallet</span>
                    </a>
                </div>
            </div>
        </div> */}
      </section>
    );
}

