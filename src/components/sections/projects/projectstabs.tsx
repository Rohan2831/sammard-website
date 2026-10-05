"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RocketsTab } from "./rocketstab";
import { CanSatsTab } from "./cansatstab";
import { RndTab } from "./rndtab";
import styles from "./projectstabs.module.css";

export function ProjectsTabs() {
  return (
    <Tabs defaultValue="rockets" className={styles.wrapper}>
      <TabsList>
        <TabsTrigger value="rockets">Rockets</TabsTrigger>
        <TabsTrigger value="cansats">CanSats</TabsTrigger>
        <TabsTrigger value="rnd">R&amp;D</TabsTrigger>
      </TabsList>
      <TabsContent value="rockets">
        <RocketsTab />
      </TabsContent>
      <TabsContent value="cansats">
        <CanSatsTab />
      </TabsContent>
      <TabsContent value="rnd">
        <RndTab />
      </TabsContent>
    </Tabs>
  );
}
