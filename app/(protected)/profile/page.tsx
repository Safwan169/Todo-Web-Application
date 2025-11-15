'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Upload, Calendar } from 'lucide-react';
import Image from 'next/image';


export default function AccountInformation() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            contactNumber: '',
            birthday: '',
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        console.log('Form Data:', data);
        console.log('Profile Image:', imageFile);
      
    };

    const handleCancel = () => {
        reset();
        setProfileImage(null);
        setImageFile(null);
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
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt="Profile"
                                        width={128}
                                        height={128}
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
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        {...register('firstName', { required: 'First name is required' })}
                                        className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"}  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        {...register('lastName', { required: 'Last name is required' })}
                                        className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"}  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
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
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"}  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
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
                                        {...register('address', { required: 'Address is required' })}
                                        className={`w-full px-4 py-3 border ${errors.address ? "border-red-500" : "border-gray-300"}  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="contactNumber"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Contact Number
                                    </label>
                                    <input
                                        id="contactNumber"
                                        type="tel"
                                        {...register('contactNumber', { required: 'Contact number is required' })}
                                        className={`w-full px-4 py-3 border ${errors.contactNumber ? "border-red-500" : "border-gray-300"}  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                    />
                                    {errors.contactNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
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
                                        {...register('birthday', { required: 'Birthday is required' })}
                                        className={`w-full px-3 py-2 pr-2 rounded-md border ${errors.birthday ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-black`} />
                                </div>
                                {errors.birthday && (
                                    <p className="mt-1 text-sm text-red-600">{errors.birthday.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button
                                type="submit"
                                className="px-12 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-12 py-3 bg-[#8CA3CD] hover:bg-[#7a92ba] text-white rounded-lg font-medium text-sm transition-colors"
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