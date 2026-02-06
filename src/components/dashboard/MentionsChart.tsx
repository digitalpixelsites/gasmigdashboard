import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: '01/02', news: 45, social: 32, blog: 12, web: 8 },
  { name: '02/02', news: 52, social: 28, blog: 18, web: 15 },
  { name: '03/02', news: 38, social: 45, blog: 10, web: 12 },
  { name: '04/02', news: 65, social: 52, blog: 22, web: 18 },
  { name: '05/02', news: 48, social: 38, blog: 15, web: 20 },
  { name: '06/02', news: 72, social: 62, blog: 28, web: 25 },
  { name: '07/02', news: 42, social: 35, blog: 14, web: 10 },
];

export function MentionsChart() {
  return (
    <div className="glass-card p-5 h-full">
      <h3 className="text-sm font-semibold text-foreground mb-4">Volume por Canal</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1D50A3" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1D50A3" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1EB3E1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1EB3E1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBlog" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCB22B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FCB22B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'hsl(220 10% 45%)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'hsl(220 10% 45%)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(0 0% 100%)', 
                border: '1px solid hsl(220 15% 90%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px hsl(220 69% 38% / 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey="news" 
              name="Notícias"
              stroke="#1D50A3" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorNews)" 
            />
            <Area 
              type="monotone" 
              dataKey="social" 
              name="Redes Sociais"
              stroke="#1EB3E1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSocial)" 
            />
            <Area 
              type="monotone" 
              dataKey="blog" 
              name="Blogs"
              stroke="#FCB22B" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBlog)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
