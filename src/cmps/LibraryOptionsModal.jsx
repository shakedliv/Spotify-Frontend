import { AddToQueueIcon } from '../assets/svg/AddToQueueIcon.jsx'
import { ExcludeIcon } from '../assets/svg/ExcludeIcon.jsx'
import { ShareIcon } from '../assets/svg/ShareIcon.jsx'
import { PlusIcon } from '../assets/svg/PlusIcon.jsx'
import { ArrowAsideIcon } from '../assets/svg/ArrowAsideIcon.jsx'
import { AlbumIcon } from '../assets/svg/AlbumIcon.jsx'
import { UserIcon } from '../assets/svg/UserIcon.jsx'
import { EditIcon } from '../assets/svg/EditIcon.jsx'
import { DeleteIcon } from '../assets/svg/DeleteIcon.jsx'
import { CreatePlaylistIcon } from '../assets/svg/CreatePlaylistIcon.jsx'
import { MakePrivateIcon } from '../assets/svg/MakePrivateIcon.jsx'
import { InviteCollaboratorsIcon } from '../assets/svg/InviteCollaboratorsIcon.jsx'
import { FolderIcon } from '../assets/svg/FolderIcon.jsx'
import { PinIcon } from '../assets/svg/PinIcon.jsx'

// import { FolderIcon } from '../assets/svg/FolderIcon.jsx'
// import { LockIcon } from '../assets/svg/LockIcon.jsx'
// import { PinIcon } from '../assets/svg/PinIcon.jsx'

export function LibraryOptionsModal({  onRemoveStation }) {
    return (
        <section className='library-options-modal flex column'>
            <button className='flex align-center' style={{ gap: '12px' }}>
                <AddToQueueIcon />
                <span>Add to queue</span>
            </button>

            <button
                className='flex align-center'
                style={{ gap: '12px' }}
            >
                <UserIcon />
                <span>Remove from profile</span>
            </button>

            <button className='flex align-center' style={{ gap: '12px' }}>
                <EditIcon />
                <span>Edit details</span>
            </button>

            <button
                className='flex align-center'
                style={{ gap: '12px' }}
                onClick={onRemoveStation}
            >
                <DeleteIcon />
                <span>Delete</span>
            </button>

            <div className='separator'></div>

            <button className='flex align-center' style={{ gap: '12px' }}>
                <CreatePlaylistIcon />
                <span>Create playlist</span>
            </button>

            <button className='flex align-center' style={{ gap: '12px' }}>
                <PlusIcon />
                <span>Create folder</span>
            </button>

            <div className='separator'></div>

            <button className='flex align-center' style={{ gap: '12px' }}>
               <MakePrivateIcon />
                <span>Make private</span>
            </button>

          <button className='flex align-center' style={{ gap: '12px' }}>
             <InviteCollaboratorsIcon />
                <span>Invite collaborators</span>
            </button>

            <button className='flex align-center' style={{ gap: '12px' }}>
                <ExcludeIcon />
                <span>Exclude from your taste profile</span>
            </button>

            <button className='flex align-center space-between'>
                <div className='flex align-center' style={{ gap: '12px' }}>
                    <FolderIcon/>
                    <span>Move to folder</span>
                </div>
                <ArrowAsideIcon />
            </button>

            <button className='flex align-center' style={{ gap: '12px' }}>
               <PinIcon />
                <span>Pin playlist</span>
            </button>

            <button className='flex align-center space-between'>
                <div className='flex align-center' style={{ gap: '12px' }}>
                    <ShareIcon />
                    <span>Share</span>
                </div>
                <ArrowAsideIcon />
            </button>
        </section>
    )
}
