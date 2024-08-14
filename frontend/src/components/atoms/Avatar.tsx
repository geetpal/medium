interface AvatarTypes{
    name: string,
    size: "small" | "big"
}

export const Avatar = ({name, size}: AvatarTypes) => {
    return <div>
                <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full ${size === 'small'? 'w-8 h-8': 'w-10 h-10'}`}>
                    <div className="font-medium text-gray-600">{name[0]}</div>
                </div>
            </div> }