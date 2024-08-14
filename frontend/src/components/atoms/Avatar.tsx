interface AvatarTypes{
    name: string,
    size: "small" | "big"
}

export const Avatar = ({name, size}: AvatarTypes) => {
    return <div>
                <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full ${size === 'small'? 'w-8 h': 'w-10 h-10'}`}>
                    <span className="font-medium text-gray-600">{name[0]}</span>
                </div>
            </div> }