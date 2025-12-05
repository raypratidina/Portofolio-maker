import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Project</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <ProjectForm />
            </div>
        </div>
    );
}
