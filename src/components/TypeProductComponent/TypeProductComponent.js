import { useNavigate } from 'react-router-dom';

function TypeProductComponent({ typeProduct }) {
    const navigate = useNavigate();
    const handleNavigateType = (type) => {
        navigate(
            `/product/${type
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[đĐ]/g, 'd')
                .replace(/([^0-9a-z-\s])/g, '')
                .replace(/(\s+)/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')}`,
            { state: type },
        );
    };
    return (
        <div
            style={{
                cursor: 'pointer',
            }}
            onClick={() => handleNavigateType(typeProduct)}
        >
            {typeProduct}
        </div>
    );
}

export default TypeProductComponent;
