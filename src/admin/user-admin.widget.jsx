import React from 'react'
import { getLazyComponent } from '../index'

export default function UserAdmin() {
    const User = getLazyComponent('user')
    const Admin = getLazyComponent('admin')
    return (
        <div>
            <Admin />
            <User />
        </div>
    )
}
