
import Layout from '@/components/Layout';
import CreateGigForm from '@/components/CreateGigForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateGig = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto pb-16">
        <h1 className="text-2xl font-bold mb-6">Create a New Gig</h1>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Gig Details</CardTitle>
            <CardDescription>
              Fill out the information below to post your micro-gig
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateGigForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateGig;
