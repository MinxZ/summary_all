import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { motion } from 'framer-motion'
import { LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Popover from '~/components/shared/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '~/utils/constants'

export default function UserDropdown() {
  // const { data: session } = useSession();
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  const { email, user_metadata } = user || {}
  const image = user_metadata?.avatar_url
  const [openPopover, setOpenPopover] = useState(false)

  if (!email) return null

  async function signOut(param: { redirect: boolean }) {
    const { error } = await supabaseClient.auth.signOut()
    error && console.error('=======sign out error=====', { error })
  }

  return (
    <motion.div className="relative inline-block flex content-center text-left" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            {/* <Link
              href="/user/videos"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">パーソナルセンター</p>
            </Link> */}
            {/* <Link
              href="/user/integration"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <Edit className="h-4 w-4" />
              <p className="text-sm">メモをエクスポートする</p>
            </Link> */}
            <Link
              href="/shop"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <ShoppingBag className="h-4 w-4" />
              <p className="text-sm">回数購入</p>
            </Link>
            {/* <Link
              href="/#"
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <Clover className="h-4 w-4" />
              <p className="text-sm">報酬プログラム</p>
            </Link> */}
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut({ redirect: false })}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">サインアウト</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <img
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </motion.div>
  )
}
