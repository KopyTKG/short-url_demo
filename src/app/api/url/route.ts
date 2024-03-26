import RedisLib from '@/lib/redis'
export const dynamic = 'force-dynamic'

function getRandomNumber(): number {
    const min = 1;
    const max = 1099511627775
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(req: Request){
    try {
        const path = new URL(req.url)
        const id = path.searchParams.get('id')
        if (!id) throw new Error('No id provided')

        const redis = RedisLib.getInstance().getClient();
        
        let url = await redis.get(id);

        if (id) {
            return new Response(JSON.stringify({url: url}), { status: 200 })
        } else {
            return new Response(JSON.stringify({message: 'No url found'}), { status: 404 })
        }

    } catch (error) {
        return new Response('Error', { status: 500 })
    }
}


export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { url } = data
        
        const redis = RedisLib.getInstance().getClient();

        let id = await redis.get(url);

        if (id) {
            return new Response(JSON.stringify({id: id}), { status: 200 })
        } else {
   
            let id = getRandomNumber().toString(16)
            
            await redis.set(id, url, 'EX', 60 * 60 * 4)
            await redis.set(url, id, 'EX', 60 * 60 * 4)
            
            return new Response(JSON.stringify({id: id}), { status: 200 })
        }
    } catch (error) {
        return new Response('Error', { status: 500 })
    }
}