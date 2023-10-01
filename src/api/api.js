import connectMongoDB from "../database/mongodb";
import Topic from "../database/schema";


export async function POST(request,response) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return response.json({ message: "Topic Created" }, { status: 201 });
}

// export async function GET() {
//   await connectMongoDB();
//   const topics = await Topic.find();
//   return NextResponse.json({ topics });
// }

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }