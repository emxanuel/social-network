import React from 'react'
import Navbar from './Navbar'

interface Props {
    Comp: React.ComponentType;
}

const Home: React.FC<Props> = ({ Comp }) => {
    return (
    <div>
        <Navbar />
        <Comp />
    </div>
    )
}

export default Home