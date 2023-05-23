const usePostToCloudinary = async (files: any) => {
    const data = new FormData();
    data.append('file', files);
    data.append('upload_preset', '2clothy');

    const res = await fetch('https://api.cloudinary.com/v1_1/sacchidananad-utech/image/upload', {
        method: 'POST',
        body: data,
    });

    const { secure_url } = await res.json();
    return { link: secure_url };
};

export default usePostToCloudinary;
