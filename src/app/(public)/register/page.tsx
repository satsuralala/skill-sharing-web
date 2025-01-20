'use client'

import { Input } from '@/components/shadcn/input';
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
  }
}
`;

const Register=()=> {
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');

  const [register,{loading}] = useMutation(REGISTER, {
    onCompleted:async(data)=>{
      localStorage.setItem('token',data.register.token);
      window.location.href = '/signIn'
    },
    variables: {
      name:name,
      email:email,
      password:password,
    },
  });

  return (
    <div data-cy="register-page-container" className="pt-[150px] justify-items-center">
    <div data-cy="register-email-header" className="flex items-center gap-1">
      <Image src="/logo.svg" width={20} height={24} alt="logo" className="w-5 h-6" />
      <div className="text-[#424242] font-bold text-2xl">Skill sharing</div>
    </div>
    <div className="text-[#09090B] font-semibold text-2xl pt-6 ">Create an account</div>
    <div className="text-[#71717A] text-sm font-normal pt-1 ">Enter your email, name and password below to create your account</div>
    <div className="pt-6">
      <div className='flex flex-col gap-1'>
      <div className="text-[#09090B] font-medium text-sm pb-1">Name</div>
      <Input data-cy="register-email-input" placeholder="Naraa" className="w-[350px] border-[#E4E4E7] border-2 text-black bg-white" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="text-[#09090B] font-medium text-sm pb-1">Email</div>
      <Input data-cy="register-email-input" placeholder="naraa@example.com" className="w-[350px] border-[#E4E4E7] text-black border-2 bg-white" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="text-[#09090B] font-medium text-sm pb-1">Password</div>
      <Input data-cy="register-email-input" placeholder="Naraa1213" className="w-[350px] border-[#E4E4E7] border-2 text-black bg-white" value={password} onChange={(e) => setPassword(e.target.value)} />

      </div>
      <button data-cy="register-continue-button" className="w-[350px] h-9 bg-black  hover:bg-slate-700 rounded-full text-[#FAFAFA] text-sm font-medium mt-4" onClick={() => register()} disabled={loading}>
        {loading ? <Image src="/spinner.svg" alt="loading" width={20} height={20} className="animate-spin" /> : 'Continue'}
      </button>
      <div className="flex">
      
      </div>
      <Link href="/signIn">
        <button data-cy="signIn" className="w-[350px] h-9 bg-white  border-[#E4E4E7] rounded-full text-[#18181B] hover:bg-white border-2 text-sm font-medium mt-4">
          Log in
        </button>
      </Link>

      <div className="text-[#71717A] font-normal text-sm pt-6 text-center">By clicking continue, you agree to our</div>
      <div className="flex justify-center">
        <div className="text-[#71717A] font-normal text-sm text-center underline-offset-1 underline">Terms of Service </div>
        <div className="text-[#71717A] font-normal text-sm text-center mx-1"> and</div>
        <div className="text-[#71717A] font-normal text-sm text-center underline-offset-1 underline"> Privacy Policy.</div>
      </div>
    </div>
    
  </div>
  );
}

export default Register;
