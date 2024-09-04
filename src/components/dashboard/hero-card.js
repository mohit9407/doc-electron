'useClient'
import { dashboardLinks } from "../../lib/constants/dashboard-links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import DynamicLink from "../../components/dynamic-link";

const HeroCard = () => {
  return (
    <div className="grid grid-cols-1 pt-5 md:grid-cols-2">
      {dashboardLinks.map((_link) => (
        <DynamicLink key={_link.href} href={_link.href}>
          <Card className="scale-95 cursor-pointer px-4 py-2 transition hover:scale-100">
            <CardHeader>
              <CardTitle>{_link.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{_link.description}</CardDescription>
            </CardContent>
          </Card>
        </DynamicLink>
      ))}
    </div>
  );
};

export default HeroCard;
