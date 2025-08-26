import { Container, Card } from 'react-bootstrap';

export default function NeklooForm({children, title}) {
    return (
    <Container className="d-flex justify-content-center align-items-center h-100 w-100" style={{ padding: '0', margin: '0' }}>
        <Card className="p-4 shadow-sm form border-0 rounded-5 shadow-lg" style={{ width: '100%', height: 'auto' }}>
            <h2 className="text-center mb-4">{title}</h2>
            {children}
        </Card> 
    </Container>
    );
}