"use client"
import ForgotPass from '@/components/forgotpass'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import React from 'react'

function ForgotPassPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsContent value="signup">
          <Card>
            <ForgotPass/>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ForgotPassPage