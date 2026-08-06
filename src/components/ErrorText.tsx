const ErrorText = ({ error }: { error: string }) => {
    return (
        <p className='ml-auto w-max border-2 border-red-500 p-0.5 bg-red-50 text-red-500 rounded-md font-bold text-xs'>
            {error}
        </p>
    );
};

export default ErrorText;
