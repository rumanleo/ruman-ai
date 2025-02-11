import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className='flex h-screen w-auto bg-[#e3e3e3]'>
      <div className='fixed h-auto w-auto p-8'>
        <p className='text-zinc-400 text-xl antialiased'>
          Ruman.
        </p>
        <p className='text-zinc-900 text-xl font-medium antialiased'>
          Loves building delightful experiences
        </p>

        <div className='flex gap-8 select-none'>
          <a
            href='mailto:hello@ruman.ai'
            className='border border-zinc-400 p-2 px-6 mt-4 text-lg font-medium text-black hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all inline-block cursor-pointer rounded-full'>
            Let's chat
          </a>
          <a
            href='https://www.linkedin.com/in/iamruman/'
            className='border-b border-zinc-900 p-2 px-0 mt-4 text-lg font-normal text-black hover:border-zinc-900 hover:border-b-2 transition-colors inline-block cursor-pointer'>
            Linkedin
          </a>
        </div>
      </div>

      <div className='fixed bottom-4 right-0 w-40 h-10 bg-[#e3e3e3] hidden sm:block'>
      </div>
      
      <div className='mt-16 sm:mt-0 w-full'>
        <Spline
          scene="https://prod.spline.design/K5TkdnvskFHYG5TY/scene.splinecode"
        />
      </div>
    </main>

  );
}
