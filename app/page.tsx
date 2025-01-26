import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className='flex h-screen w-auto bg-[#e3e3e3] '>
      <div className='fixed h-auto w-auto p-8'>
        <p className='text-zinc-400 text-xl antialiased'>
          Ruman.
        </p>
        <p className='text-zinc-900 text-xl font-medium antialiased'>
          Loves building delightful experiences
        </p>
        <div className='flex gap-8'>
        <a 
          href='mailto:hello@ruman.ai'
          className='border border-zinc-900 p-2 px-4 mt-4 text-lg font-normal text-black hover:bg-zinc-900 hover:text-white transition-colors inline-block cursor-pointer'>
            Let's chat
        </a>
        <a 
          href='https://www.linkedin.com/in/iamruman/'
          className='border-b border-zinc-900 p-2 px-0 mt-4 text-lg font-normal text-black hover:border-zinc-900 hover:border-b-2 transition-colors inline-block cursor-pointer'>
            Linkedin
        </a>
        </div>
       
      </div>
      <Spline
        scene="https://prod.spline.design/K5TkdnvskFHYG5TY/scene.splinecode" 
      />
    </main>

  );
}
