import UserCard from "../../components/UIelements/UserCard";


const people = [
    {
        name: 'Leslie',
        lastname: 'Alexander',
        username: 'Lesalex',
        email: 'leslie.alexander@example.com',
        role: 'admin',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael',
        lastname: 'Foster',
        username: 'Micfost',
        email: 'michael.foster@example.com',
        role: 'manager',
        avatar:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries',
        lastname: 'Vincent',
        username: 'Driesvin',
        email: 'dries.vincent@example.com',
        role: 'user',
        avatar:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]

// [
//     {
//         "avatar": "https://png.pngtree.com/png-clipart/20200701/original/pngtree-character-default-avatar-png-image_5407167.jpg",
//         "_id": "654336be48f74e0c97524710",
//         "username": "test",
//         "email": "test@gmail.com",
//         "role": "user",
//         "bookmarks": [],
//         "createdAt": "2023-11-02T05:42:22.177Z",
//         "updatedAt": "2023-11-02T05:42:22.177Z",
//         "__v": 0
//     },
//     {
//         "_id": "654c4a3543d2138226c3124e",
//         "username": "francisihejirikardb",
//         "firstname": "Francis",
//         "lastname": "Ihejirika",
//         "email": "francisihejirikadev@gmail.com",
//         "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJbC0iAeLWs5tzoEQf9PMNowS-KrPoC72s94NJ0GRqY=s96-c",
//         "role": "user",
//         "bookmarks": [],
//         "createdAt": "2023-11-09T02:55:49.218Z",
//         "updatedAt": "2023-11-09T02:55:49.218Z",
//         "__v": 0
//     },
// ]

const Users = () => {
    return (
        <div>
            <h2 className="text-xl">All Users</h2>

            <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                    <UserCard
                        key={person.email}
                        person={person}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Users