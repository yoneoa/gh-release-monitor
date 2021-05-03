import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'



const Repository = ({ id, repository, onDelete, onToggle }) => {
    const [showReleaseNotes, setShowReleaseNotes] = useState(false);

    // Encapsulate our onDelete func in order to stop propogation to parent div
    function handleClick(e) {
        onDelete(repository.id)
        e.stopPropagation()
    }

    return (
        <div className={`repository ${repository.new_release ? 'newrelease' : ''}`} onClick={() => onToggle(repository.id)} >
            <div className='repository'>
                <h3 href=''>{repository.title} <FaTimes name='deleteButton' onClick={handleClick} /></h3>

                <div onClick={() => setShowReleaseNotes(!showReleaseNotes)}>
                    <h4>Owner: {repository.owner}</h4>
                    <h4>Release Date: {repository.release_date ? new Date(repository.release_date).toLocaleString() : "No Published Releases!"}</h4>
                </div>
                {showReleaseNotes && <div className='markdownDiv'><div className='markdownDivInner'><ReactMarkdown remarkPlugins={[gfm]}>{repository.body ? repository.body : "**No release notes to show**"}</ReactMarkdown></div></div>}

            </div>
        </div>

    )
}

export default Repository