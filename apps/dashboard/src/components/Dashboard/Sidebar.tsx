import React from 'react'

import { GuildConfig } from '../../graphql/generated/schema'

interface DashboardSidebarProps {
  guild: GuildConfig | null
}

const DashboardSidebar = ({ guild }: DashboardSidebarProps) => {
  return (
    <div className="h-screen w-64 bg-primary-purple-20">{guild?.guildId}</div>
  )
}

export default DashboardSidebar
