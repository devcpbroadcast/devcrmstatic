import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absorptionTrend, demandSplit, funnel, priceTrend } from "@/data/market";

const axis = { stroke: "var(--muted-foreground)", fontSize: 11 };
const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
  },
};

export function PriceTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weighted average price (₹/sq ft)</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceTrend} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="quarter" tick={axis} tickLine={false} axisLine={false} />
            <YAxis tick={axis} tickLine={false} axisLine={false} width={54} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="worli" name="Worli" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="lowerParel" name="Lower Parel" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="powai" name="Powai" stroke="var(--chart-5)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="thane" name="Thane West" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AbsorptionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Launches vs absorption (units, MMR)</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={absorptionTrend} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="absorbed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="quarter" tick={axis} tickLine={false} axisLine={false} />
            <YAxis tick={axis} tickLine={false} axisLine={false} width={48} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="launched" name="Launched" stroke="var(--chart-2)" fill="transparent" strokeWidth={2} />
            <Area type="monotone" dataKey="absorbed" name="Absorbed" stroke="var(--chart-1)" fill="url(#absorbed)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function DemandSplitChart() {
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)", "var(--chart-5)"];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Demand mix by buyer type</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={demandSplit} dataKey="value" nameKey="segment" innerRadius={55} outerRadius={90} paddingAngle={2}>
              {demandSplit.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function FunnelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Conversion funnel — last 90 days</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnel} layout="vertical" margin={{ top: 5, right: 24, bottom: 5, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={axis} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="stage" tick={axis} tickLine={false} axisLine={false} width={84} />
            <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="value" name="Count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
