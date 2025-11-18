'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Upload } from 'lucide-react';
import { useAuthContext } from '@/context/Context';
import { User } from '@/modules/auth/type';
import { useUpdateProfile } from '@/modules/profile/hooks';
import Button from '@/components/ui/button';


export default function AccountInformation() {
    // const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
    const { user } = useAuthContext();
    const { mutateAsync, isPending} = useUpdateProfile();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<User>({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            contact_number: '',
            birthday: '',
            bio: '',
            profile_image: '',
        },
    });

    useEffect(() => {
        if (user) {
            setValue('first_name', user.first_name);
            setValue('last_name', user.last_name);
            setValue('email', user.email);
            setValue('address', user?.address);
            setValue('contact_number', user?.contact_number);
            setValue('birthday', user?.birthday);
            setValue('bio', user?.bio);
            setValue('profile_image', user?.profile_image);
        }
    }, [user, setValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result as string); // 🔥 save preview
            };
            reader.readAsDataURL(file);
        }
    };


    const onSubmit = async (data: User) => {

        const formData = new FormData();
        formData.append('first_name', data.first_name || '');
        formData.append('last_name', data.last_name || '');
        formData.append('email', data.email || '');
        formData.append('address', data.address || '');
        formData.append('contact_number', data.contact_number || '');
        formData.append('birthday', data.birthday || '');
        formData.append('bio', data.bio || '');
        formData.append('profile_image', imageFile || '');


        await mutateAsync(formData);

    };

    const handleCancel = () => {
        // reset();
        // setImageFile(null);
    };



    return (
        <div className="min-h-screen  bg-[#EEF7FF] p-6">
            <div className="max-w-6xl bg-white rounded-2xl mx-auto px-7 py-5 space-y-6">
                {/* Page Title */}


                {/* Profile Photo Section */}
                <div className="    ">
                    <div className="flex mb-6  flex-col">
                        <h1 className="text-[24px] font-semibold text-[#0C224A]  inline-block">
                            Account Information
                        </h1>
                        <span className='bg-primary h-0.5 w-40'></span>
                    </div>
                    <div className="flex border border-gray-300 rounded-2xl w-fit px-6 py-3 items-center gap-6">
                        {/* Avatar with Camera Icon */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gray-400 overflow-hidden">
                                {profileImagePreview ? (
                                    <img
                                        src={profileImagePreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : user?.profile_image ? (
                                    <img
                                        src={user.profile_image}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-400" />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-white">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        {/* Upload Button */}
                        <label
                            htmlFor="photo-upload"
                            className="px-6 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2 text-base font-normal"
                        >
                            <Upload className="w-5 h-5" />
                            Upload New Photo
                        </label>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white rounded-2xl ">
                        <div className="space-y-6  border border-gray-300 rounded-2xl px-12 py-5">
                            {/* First Name & Last Name Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        {...register('first_name', { required: 'First name is required' })}
                                        className={`w-full px-4 py-3 border ${errors.first_name ? "border-red-500" : "border-gray-300"} text-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.first_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        {...register('last_name', { required: 'Last name is required' })}
                                        className={`w-full px-4 py-3 border ${errors.last_name ? "border-red-500" : "border-gray-300"} text-placeholder  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.last_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-black mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    readOnly
                                    {...register('email', {
                                        
                                       
                                    })}
                                    className={`w-full px-4 py-3 border  border-gray-300 text-placeholder  rounded-lg focus:outline-none `}
                                />
                              
                            </div>

                            {/* Address & Contact Number Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        {...register('address')}
                                        className={`w-full px-4 py-3 border ${errors.address ? "border-red-500" : "border-gray-300"} text-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact_number"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Contact Number
                                    </label>
                                    <input
                                        id="contact_number"
                                        type="number"
                                        {...register('contact_number',)}
                                        className={`w-full px-4 py-3 border ${errors.contact_number ? "border-red-500" : "border-gray-300"} text-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.contact_number && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contact_number.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Birthday */}
                            <div>
                                <label
                                    htmlFor="birthday"
                                    className="block text-sm font-medium text-black mb-2"
                                >
                                    Birthday
                                </label>
                                <div className="relative">
                                    <input
                                        id="birthday"
                                        type="date"
                                        {...register('birthday')}
                                        className={`w-full px-3 py-2 pr-2 rounded-md border ${errors.birthday ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-placeholder`} />
                                </div>
                                {errors.birthday && (
                                    <p className="mt-1 text-sm text-red-600">{errors.birthday.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Button
                                type="submit"
                                loading={isPending}
                                className="px-12 py-3 bg-primary cursor-pointer hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                            >
                                Save Changes
                            </Button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-12 py-3 bg-[#8CA3CD] cursor-pointer hover:bg-[#7a92ba] text-white rounded-lg font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}