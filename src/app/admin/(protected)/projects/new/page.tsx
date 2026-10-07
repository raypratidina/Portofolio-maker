import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div>
            <p className="admin-eyebrow mb-4">02 / Project editor</p>
            <h1 className="text-4xl md:text-5xl font-medium mb-8 text-foreground">Add New Project</h1>
            <div className="bg-background p-6 rounded-xl shadow-none border border-border">
                <ProjectForm />
            </div>
        </div>
    );
}
